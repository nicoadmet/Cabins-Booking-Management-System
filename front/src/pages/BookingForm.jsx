import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

export const BookingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cabin, setCabin] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [alert, setAlert] = useState({ message: '', type: '' });

    useEffect(() => {
        fetch(`http://localhost:3000/api/cabin/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Cabaña recibida:", data);
                setCabin(data);
            })
            .catch(err => {
                console.error(err);
                setAlert({ message: "Error al cargar la cabaña.", type: "danger" });
            });
    }, [id]);

    useEffect(() => {
        if (alert.message) {
            // If an alert is set, clear it after 3 seconds,
            // or navigate if it's a success message.
            const timeout = setTimeout(() => {
                if (alert.type === 'success') {
                    navigate("/dashboard"); // Navigate only after showing success alert
                }
                setAlert({ message: '', type: '' });
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [alert, navigate]); // Added navigate to dependency array

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");
        const body = {
            cabinId: id,
            userId: userId,
            startDate,
            endDate
        };

        try {
            const response = await fetch("http://localhost:3000/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setAlert({ message: "Error al realizar la reserva: " + errorData.message, type: "danger" });
                return; // Stop execution on error
            }

            // Set success alert. Navigation will be handled by the useEffect.
            setAlert({ message: "Reserva realizada con éxito", type: "success" });

        } catch (error) {
            console.error(error);
            setAlert({ message: "Hubo un error al realizar la reserva.", type: "danger" });
        }
    };

    if (!cabin) return <p className="text-center mt-5">Cargando cabaña...</p>;

    return (
        <div className="position-relative">
            {alert.message && (
                <div
                    className={`alert alert-${alert.type} position-fixed top-0 end-0 m-4 shadow rounded`}
                    style={{ zIndex: 9999, minWidth: '250px' }}
                    role="alert"
                >
                    {alert.message}
                </div>
            )}

            <Container className="mt-5">
                <div className="position-absolute top-0 start-0 m-4">
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
                </div>
                <Card className="p-4 shadow">
                    <h2 className="mb-4 text-center">Reservar: {cabin.name}</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de inicio</Form.Label>
                            <Form.Control
                                type="date"
                                required
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de fin</Form.Label>
                            <Form.Control
                                type="date"
                                required
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit">Confirmar Reserva</Button>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}

export default BookingForm;