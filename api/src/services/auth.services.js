import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js"
import { validateEmail, validatePassword, validateString } from "../helpers/validations.js";

export const verifyToken = (req, res, next) => {
    const header = req.header("Authorization") || "";

    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No posee autorización requerida" }); 
    }

    try {
        const payload = jwt.verify(token, 'cabañasTPI');
        req.user = payload;
        console.log(payload);
        next();
    } catch (error) {
        return res.status(403).json({ message: "No posee permisos correctos" });
    }
}

export const registerUser = async (req, res) => {
    const result = validateRegisterUser(req.body);

    if (result.error) {
        return res.status(400).send({ message: result.message })
    }

    const { name, email, password } = req.body;

    const user = await User.findOne({
        where: { email }
    });

    if (user) {
        return res.status(400).send({ message: "Este email ya se encuentra registrado." });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.json(newUser.id);
}


export const loginUser = async (req, res) => {

     console.log("Login recibido:", req.body);

    const result = validateLoginUser(req.body);

    if (result.error) {
        return res.status(400).send({ message: result.message })
    }

    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        return res.status(401).send({ message: "Usuario no existente" });
    }

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison) {
        return res.status(401).send({ message: "Email y/o contraseña incorrecta" });
    }

    const secretKey = 'cabañasTPI';

    const token = jwt.sign(
        { id: user.id, email, role: user.role },
        secretKey, 
        { expiresIn: '1h' }
    );

    return res.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
});
}

const validateLoginUser = (req) => {
    const result = {
        error: false,
        message: ''
    }
    const { email, password } = req;

    if (!email || !validateEmail(email))
        return {
            error: true,
            message: 'Mail inválido'
        }

    else if (!password || !validatePassword(password, 7, null, true, true)) {
        return {
            error: true,
            message: 'Contraseña inválida'
        }
    }

    return result;
}

const validateRegisterUser = (req) => {
    const result = {
        error: false,
        message: ''
    }

    const { name, email, password } = req;

    if (!name || !validateString(name, null, 13))
        return {
            error: true,
            message: 'Nombre de usuario inválido'
        }

    if (!email || !validateEmail(email))
        return {
            error: true,
            message: 'Mail inválido'
        }

    else if (!password || !validatePassword(password, 7, null, true, true)) {
        return {
            error: true,
            message: 'Contraseña inválida'
        }
    }

    return result;
}
