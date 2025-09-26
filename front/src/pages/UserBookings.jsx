import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { Row, Col, Button, Container } from "react-bootstrap";
import { jwtDecode } from 'jwt-decode';
import CustomNavbar from "../components/CustomNavbar ";

import { useAlert } from "../context/AlertContext";
 
const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { alert, setAlert } = useAlert();

  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");
  let userId;
  
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  }
  console.log(userId);
  useEffect(() => {
    if (!token) {
      setAlert({ message: "No hay usuario logueado.", type: "danger", redirectTo: "/login" });
      return;
    }

    fetch(`${baseUrl}/api/booking/user/${userId}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener reservas:", error);
        setBookings([]);
        setLoading(false);
        setAlert({ message: "No se pudieron obtener tus reservas.", type: "danger" });
      });
  }, []);

  const handleCancel = (bookingId) => {
    if (!window.confirm("¿Estás seguro que querés cancelar esta reserva?")) return;

    fetch(`${baseUrl}/api/booking/${bookingId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message);
          });
        }
        setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
        setAlert({ message: "Reserva cancelada correctamente.", type: "success" });
      })
      .catch((error) => {
        console.error("Error al cancelar reserva:", error);
        setAlert({ message: "No se pudo cancelar la reserva.", type: "danger" });
      });
  };

  if (loading) return <p className="text-center">Cargando reservas...</p>;

  return (
    <div>
      <CustomNavbar />
      <Container>
        <h2 className="mt-4 mb-4 fw-bold text-center" style={{ color: "#2c3e50" }}>
          Mis Reservas
        </h2>
        {bookings.length === 0 ? (
          <p className="text-center text-muted">No tenés reservas aún.</p>
        ) : (
          <Row className="gy-4">
            {bookings.map((booking) => (
              <Col md={6} lg={4} key={booking.id}>
                <div className="reserva-card p-4 rounded-4 h-100 shadow-sm d-flex  flex-column justify-content-between"  style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${booking.cabin?.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                  <div>
                    <div className="icono-container mb-3">
                      <span style={{ fontSize: "1.5rem" }}>🏡</span>
                    </div>
                    <h5 className="fw-bold mb-2 text-white">
                      {booking.cabin?.name || "Cabaña desconocida"}
                    </h5>
                    <p className="mb-1 d-flex align-items-center text-white">
                      <span className="me-2" style={{ fontSize: "1.2rem" }}>
                        📅
                      </span>
                      <strong>Desde:</strong>&nbsp;{booking.startDate}
                    </p>
                    <p className="mb-1 d-flex align-items-center text-white">
                      <span className="me-2" style={{ fontSize: "1.2rem" }}>
                        📅
                      </span>
                      <strong>Hasta:</strong>&nbsp;{booking.endDate}
                    </p>
                  </div>

                  <Button
                    variant="outline-danger"
                    className="mt-3 w-100 text-white"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancelar reserva
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        )}

      </Container>


      <style jsx="true">{`
        .reserva-card {
          background: linear-gradient(145deg, #f8f9fa, #ffffff);
          border: 1px solid #dee2e6;
          transition: all 0.3s ease;
          cursor: default;
        }

        .reserva-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
        }

        .icono-container {
          width: 50px;
          height: 50px;
          background-color: #e6f4ea;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default UserBookings;
