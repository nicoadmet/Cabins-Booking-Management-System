import { useState, useRef, useEffect } from "react";
import { validateRegister } from "../utils/ValidationsRegister";
import { Link, redirect } from "react-router-dom";
import { Form, Button, Card, Container } from 'react-bootstrap';

import { useAlert } from "../context/AlertContext";

export const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({ name: false, email: false, password: false });
    const { alert, setAlert } = useAlert();

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationsErrors = validateRegister(formData);

        if (Object.keys(validationsErrors).length > 0) {
            setErrors(validationsErrors);
            setAlert({ message: "Por favor, corrige los errores del formulario.", type: "danger" });

            if (validationsErrors.name) {
                nameRef.current.focus();
            } else if (validationsErrors.email) {
                emailRef.current.focus();
            } else if (validationsErrors.password) {
                passwordRef.current.focus();
            }
            return;
        } else {
            setErrors({});
            try {
                const response = await fetch(`${baseUrl}/api/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setAlert({ message: "Error: " + errorData.message, type: "danger" });
                    return;
                }

                setAlert({ message: "Registro exitoso.", type: "success", redirectTo: "/" });

            } catch (error) {
                console.error("Error en el registro:", error);
                setAlert({ message: "Hubo un problema con el servidor", type: "danger" });
            }
        }
    };

    return (
        <div className="position-relative"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}
        >
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh' }}
            >
                <div className="position-absolute top-0 start-0 m-4">
                    <Link to="/" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
                </div>

                <Card style={{ width: '100%', maxWidth: '800px' }} className="shadow p-4">
                    <Card.Body>
                        <h2 className="text-center mb-4 fs-3">Registro</h2>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    value={formData.name}
                                    onChange={handleChange}
                                    ref={nameRef}
                                    isInvalid={!!errors.name}
                                />
                                {errors.name && (
                                    <Form.Text className="text-danger">{errors.name}</Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    placeholder="Ingresar email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    ref={emailRef}
                                    isInvalid={!!errors.email}
                                />
                                {errors.email && (
                                    <Form.Text className="text-danger">{errors.email}</Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Ingresar contraseña"
                                    value={formData.password}
                                    onChange={handleChange}
                                    ref={passwordRef}
                                    isInvalid={!!errors.password}
                                />
                                {errors.password && (
                                    <Form.Text className="text-danger">{errors.password}</Form.Text>
                                )}
                            </Form.Group>

                            <Button variant="success" type="submit" className="w-100">
                                Registrarse
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Register;
