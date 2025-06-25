import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("No hay usuario logueado.");
      return;
    }

    fetch(`http://localhost:3000/api/booking/user/${userId}`)
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
        alert("No se pudieron obtener tus reservas.");
      });
  }, []);

  const handleCancel = (bookingId) => {
    if (!window.confirm("¿Estás seguro que querés cancelar esta reserva?")) return;

    fetch(`http://localhost:3000/api/booking/${bookingId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message);
          });
        }
        setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
        alert("Reserva cancelada correctamente.");
      })
      .catch((error) => {
        console.error("Error al cancelar reserva:", error);
        alert("No se pudo cancelar la reserva.");
      });
  };

  if (loading) return <p className="text-center">Cargando reservas...</p>;

  return (
    <div className="container py-5">
      <div className="position-absolute top-0 start-0 m-4">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          &larr; Volver
        </Link>
      </div>
      <h2 className="mb-4 fw-bold text-center" style={{ color: "#2c3e50" }}>
        Mis Reservas
      </h2>
      {bookings.length === 0 ? (
        <p className="text-center text-muted">No tenés reservas aún.</p>
      ) : (
        <Row className="gy-4">
          {bookings.map((booking) => (
            <Col md={6} lg={4} key={booking.id}>
              <div className="reserva-card p-4 rounded-4 h-100 shadow-sm d-flex flex-column justify-content-between">
                <div>
                  <div className="icono-container mb-3">
                    <span style={{ fontSize: "1.5rem" }}>🏡</span>
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: "#1c3d3d" }}>
                    {booking.cabin?.name || "Cabaña desconocida"}
                  </h5>
                  <p className="mb-1 d-flex align-items-center text-muted">
                    <span className="me-2" style={{ fontSize: "1.2rem" }}>
                      📅
                    </span>
                    <strong>Desde:</strong>&nbsp;{booking.startDate}
                  </p>
                  <p className="mb-1 d-flex align-items-center text-muted">
                    <span className="me-2" style={{ fontSize: "1.2rem" }}>
                      📅
                    </span>
                    <strong>Hasta:</strong>&nbsp;{booking.endDate}
                  </p>
                </div>

                <Button
                  variant="outline-danger"
                  className="mt-3 w-100"
                  onClick={() => handleCancel(booking.id)}
                >
                  Cancelar reserva
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      )}

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
