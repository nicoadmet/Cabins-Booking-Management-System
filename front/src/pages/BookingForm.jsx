import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

export const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cabin, setCabin] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseUrl}/api/cabin/${id}`)
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
      const timeout = setTimeout(() => {
        if (alert.type === 'success') {
          navigate("/dashboard");
        }
        setAlert({ message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const body = {
      cabinId: id,
      userId,
      startDate: startDate ? startDate.toISOString().split("T")[0] : "",
      endDate: endDate ? endDate.toISOString().split("T")[0] : ""
    };

    try {
      const response = await fetch(`${baseUrl}/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAlert({ message: "Error al realizar la reserva: " + errorData.message, type: "danger" });
        return;
      }

      setAlert({ message: "Reserva realizada con éxito", type: "success" });

    } catch (error) {
      console.error(error);
      setAlert({ message: "Hubo un error al realizar la reserva.", type: "danger" });
    }
  };

  if (!cabin) return <p className="text-center mt-5">Cargando cabaña...</p>;

  return (
    <div 
        className="position-relative d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
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

        <div className="position-absolute top-0 start-0 m-4">
          <Link to="/adminPanel" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
        </div>

        <Container className="w-50">
            <div className="position-absolute top-0 start-0 m-4">
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
            </div>
            <Card className="p-4 shadow">
            <h2 className="mb-4 text-center">Reservar: {cabin.name}</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                <Col md={6} className="d-flex flex-column align-items-center">
                    <Form.Label>Fecha de inicio:</Form.Label>
                    <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecciona fecha de inicio"
                    locale="es"
                    className="form-control"
                    />
                </Col>
                <Col md={6} className="d-flex flex-column align-items-center">
                    <Form.Label>Fecha de fin:</Form.Label>
                    <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecciona fecha de fin"
                    locale="es"
                    className="form-control"
                    />
                </Col>
                </Row>
                <div style={{textAlign: 'center'}}>
                    <Button type="submit" variant="primary" className="mt-4" style={{ width: '100%'}}>Confirmar Reserva</Button>
                </div>
            </Form>
            </Card>
        </Container>
    </div>

  );
};

export default BookingForm;
