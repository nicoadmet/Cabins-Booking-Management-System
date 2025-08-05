import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validateLogin } from "../utils/ValidationsLogin";

import { Form, Button, Card, Container } from 'react-bootstrap';


export const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: false, password: false });
    const [alert, setAlert] = useState({ message: '', type: '' });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        localStorage.removeItem("token");
    }, []);

    useEffect(() => {
        if (alert.message) {
            const timeout = setTimeout(() => {
                if (alert.type === 'success') {
                    navigate("/");
                }
                setAlert({ message: '', type: '' }); 
            }, 3000); 
            return () => clearTimeout(timeout);
        }
    }, [alert, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationsErrors = validateLogin(formData);

        if (Object.keys(validationsErrors).length > 0) {
            setErrors(validationsErrors);
            setAlert({ message: "Por favor, corrige los errores del formulario.", type: "danger" });

            if (validationsErrors.email) {
                emailRef.current.focus();
            } else if (validationsErrors.password) {
                passwordRef.current.focus();
            }
            return; 
        } else {
            setErrors({}); 
            try {
                const response = await fetch(`${baseUrl}/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setAlert({ message: "Error al iniciar sesión: " + errorData.message, type: "danger" });
                    return;
                }

                const data = await response.json();
                localStorage.setItem("token", data.token);

                setAlert({ message: "Inicio de sesión exitoso", type: "success" });
                

            } catch (error) {
                console.error("Error al hacer login:", error);
                setAlert({ message: "Ocurrió un error inesperado al intentar iniciar sesión.", type: "danger" });
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
            {alert.message && (
                <div
                    className={`alert alert-${alert.type} position-fixed top-0 end-0 m-4 shadow rounded`}
                    style={{ zIndex: 9999, minWidth: '250px' }}
                    role="alert"
                >
                    {alert.message}
                </div>
            )}

            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh', width: '100vh',  }}
            >
                <div className="position-absolute top-0 start-0 m-4">
                    <Link to="/" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
                </div>

                <Card style={{ width: '100%', maxWidth: '800px', maxHeight: '500px' }} className="shadow">
                    <Card.Body>
                        <h2 className="text-center mb-4">Iniciar Sesión</h2>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    placeholder="Ingresar email"
                                    ref={emailRef}
                                    onChange={handleChange}
                                    value={formData.email}
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
                                    ref={passwordRef}
                                    onChange={handleChange}
                                    value={formData.password}
                                    isInvalid={!!errors.password} 
                                />
                                {errors.password && (
                                    <Form.Text className="text-danger">{errors.password}</Form.Text>
                                )}
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 mb-3">
                                Iniciar Sesión
                            </Button>

                            <div className="text-center">
                                <p>
                                    ¿Aún no tenés cuenta? <Link to="/register">Registrate</Link>
                                </p>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Login;