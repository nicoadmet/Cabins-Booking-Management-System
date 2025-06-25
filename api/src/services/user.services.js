import { User } from "../models/User.js"

export const getAllUsers = async (req, res) => {
   const users = await User.findAll();
   if (!users) {
        return res.status(404).send({message: "No se encontraron usuarios"});
   }
   res.json(users);
}

export const updateUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).send({message: "Usuario no encontrado"});
    }
    await user.update({
        name, email, password, role
    });

    res.json(user);
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).send({message: "Usuario no encontrado"});
    }
    await user.destroy();
    res.send(`El usuario con id ${id} ha sido eliminado correctamente`);
}
