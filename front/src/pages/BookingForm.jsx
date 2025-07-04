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
          navigate("/");
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
          <Link to="/" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
        </div>

        <Container className="my-5">
          <h2>{cabin.name}</h2>
          <Row>
            <Col md={6}>
              <div>
                <img
                  src={cabin.imageUrl}
                  alt={cabin.name}
                  style={{ width: "100%", height: "auto", borderRadius: "10px", marginBottom: "1rem" }}
                />
              </div>

              <div className="mb-4">
                <h4 className="mb-3">Más sobre {cabin.name}</h4>

                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-person-circle fs-5 text-primary me-2"></i>
                  <span><strong>Recibimiento:</strong> Personal de EcoCabañas</span>
                </div>
                <hr />
              </div>

              <div>
                <h4>Horarios de Ingreso y Egreso</h4>
                <div className="d-flex align-items-center mb-2 gap-5">
                  <span><i className="bi bi-door-open fs-5 text-primary me-2"></i><strong>Check-in:</strong> 12:00pm</span>
                  <span><i className="bi bi-box-arrow-right fs-5 text-primary me-2"></i><strong>Check-out:</strong> 11:00am</span>
                </div>
                <hr />
              </div>
              

              <div className="mb-4">
                <h4 className="mb-3">Servicios que ofrece</h4>
                <div className="d-flex flex-wrap gap-4">
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-wifi fs-2 text-secondary"></i>
                    <span>Wi-Fi</span>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-snow fs-2 text-secondary"></i>
                    <span>Aire Acondicionado</span>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-car-front fs-2 text-secondary"></i>
                    <span>Estacionamiento</span>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-fire fs-2 text-secondary"></i>
                    <span>Parrilla</span>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-tv fs-2 text-secondary"></i>
                    <span>Televisión</span>
                  </div>
                </div>
              </div>
              <hr />

              <div className="mb-4">
                <h4 className="mb-3">Precio</h4>
                <div className="d-flex align-items-center gap-3">
                  <i className="bi bi-tag fs-4 text-primary"></i>
                  <p className="mb-0">
                    <strong>Desde ${cabin.pricePerNight}</strong> por noche
                  </p>
                </div>
              </div>

              <hr />

              <div className="mt-4">
                <h5 className="mb-3">Métodos de pago</h5>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-bank fs-5 text-primary me-2"></i>
                    <span>Transferencia bancaria</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-cash fs-5 text-primary me-2"></i>
                    <span>Efectivo</span>
                  </div>
                </div>
              </div>

               
            </Col>

            <Col md={3}>
              <Card className="p-4 shadow">
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Elegir fecha"
                        locale="es"
                        className="form-control"
                      />
                    </Col>
                    <Col md={6}>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Elegir fecha"
                        locale="es"
                        className="form-control"
                      />
                    </Col>
                  </Row>

                  <Button
                    type="submit"
                    variant="primary"
                    className="mt-4 w-100"
                  >
                    Reservar
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
    </div>

  );
};

export default BookingForm;
