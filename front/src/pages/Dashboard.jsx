import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar ";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import naturalezaImg from '../assets/Naturaleza.png';
import comodidadImg from '../assets/Comodidad.png';
import atencionImg from '../assets/Atencion.png';

export const Dashboard = ({ userRole }) => {
  const [cabins, setCabins] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/cabin")
      .then((res) => res.json())
      .then((data) => setCabins(data))
      .catch((error) => {
        console.error("Error al obtener cabañas:", error);
        setAlert({ message: "Error al cargar las cabañas.", type: "danger" });
      });
  }, []);

  useEffect(() => {
    if (alert.message) {
      const timeout = setTimeout(() => setAlert({ message: '', type: '' }), 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  const handleReserve = (cabinId, isAvailable) => {
    if (!isAvailable) {
      setAlert({ message: "Esta cabaña no está disponible.", type: "danger" });
      return;
    }
    navigate(`/BookingForm/${cabinId}`);
  };

  return (
    <div>
      <CustomNavbar userRole={userRole} />

      {alert.message && (
        <div
          className={`alert alert-${alert.type} position-fixed top-0 end-0 m-4 shadow rounded`}
          style={{ zIndex: 9999, minWidth: '250px' }}
          role="alert"
        >
          {alert.message}
        </div>
      )}

      <section id="cabañas" style={{ padding: "4rem 0", minHeight: "100vh" }}>
        <Container>
          <div className="d-flex align-items-center justify-content-center mb-5">
            <div className="linea-titulo me-3"></div>
            <h2 className="text-center fw-bold m-0" style={{ color: "#2c3e50", whiteSpace: "nowrap" }}>
              Nuestras Cabañas
            </h2>
            <div className="linea-titulo ms-3"></div>
          </div>
          <Row className="justify-content-center align-items-stretch">
            {cabins.map((cabin) => (
              <Col md={4} key={cabin.id} className="mb-4">
                <Card className="text-center p-3 shadow h-100">
                  <Card.Img
                    variant="top"
                    src={cabin.imageUrl}
                    alt={cabin.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h5 fw-bold text-dark">{cabin.name}</Card.Title>
                    <Card.Text className="text-secondary small lh-base mb-3 text-truncate-multiline">
                      {cabin.description}
                    </Card.Text>
                    <Card.Text className="text-muted fst-italic small mb-2">
                      Capacidad: {cabin.capacity} Personas
                    </Card.Text>
                    <Card.Text className="text-muted fst-italic small mb-3">
                      Precio por noche: ${cabin.pricePerNight}
                    </Card.Text>
                    <Button
                      className="btn-primary mt-auto"
                      onClick={() => handleReserve(cabin.id, cabin.isAvailable)}
                    >
                      Reservar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section
        id="conocenos"
        style={{ padding: "4rem 0", backgroundColor: "#f0f4f8", minHeight: "100vh" }}
      >
        <Container>
          <div className="d-flex align-items-center justify-content-center mb-5">
            <div className="linea-titulo me-3"></div>
            <h2 className="text-center fw-bold m-0" style={{ color: "#2c3e50", whiteSpace: "nowrap" }}>
              ¿Quiénes Somos?
            </h2>
            <div className="linea-titulo ms-3"></div>
          </div>

          <Row className="text-center gy-4">
            {[
              {
                img: naturalezaImg,
                alt: "Naturaleza",
                title: "Amantes de la Naturaleza",
                text: "Nuestro compromiso es brindarte un espacio en armonía con el entorno, rodeado de montañas, bosques y aire puro.",
              },
              {
                img: comodidadImg,
                alt: "Comodidad",
                title: "Cabañas Confortables",
                text: "Combinamos rusticidad con confort moderno. Todas nuestras cabañas están totalmente equipadas para tu descanso.",
              },
              {
                img: atencionImg,
                alt: "Atención",
                title: "Atención Personalizada",
                text: "Nos encanta recibirte como si fueras parte de nuestra familia. Siempre atentos a que vivas una experiencia única.",
              },
            ].map(({ img, alt, title, text }) => (
              <Col md={4} key={title}>
                <div className="conocenos-card p-4 rounded shadow-sm h-100">
                  <img
                    src={img}
                    alt={alt}
                    width={100}
                    className="mb-3 mx-auto d-block img-fluid icon-hover"
                    style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))" }}
                  />
                  <h4 className="mb-3 fw-semibold" style={{ color: "#34495e" }}>
                    {title}
                  </h4>
                  <p className="text-muted fs-6">{text}</p>
                </div>
              </Col>
            ))}
          </Row>

          <Row className="justify-content-center mt-5">
            <Col lg={20}>
              <div>
                <h5 className="subtitulo mb-2">Nuestro origen</h5>
                <p className="text-muted fs-6">
                  Nacimos con una idea clara: hacer que escaparse de la rutina sea fácil, accesible y memorable.
                  Empezamos con pocas cabañas, hechas a pulmón, pero con mucho amor por los detalles. Hoy seguimos creciendo sin perder lo más importante: que cada huésped se sienta como en casa… pero en medio del bosque.
                </p>

                <h5 className="subtitulo mt-4 mb-2">Nuestra misión</h5>
                <p className="text-muted fs-6">
                  Darte la mejor experiencia sin que tengas que preocuparte por nada. Te ofrecemos un lugar donde descansar, reconectar y disfrutar.
                  Nuestro equipo está siempre listo para ayudarte con buena onda, respuestas rápidas y un trato humano de verdad.
                </p>

                <h5 className="subtitulo mt-4 mb-2">Nuestro estilo</h5>
                <p className="text-muted fs-6">
                  No somos un hotel de lujo, pero tampoco una cabaña improvisada. Apostamos a lo rústico con estilo:
                  espacios cálidos, bien cuidados y con todo lo que necesitás. Si buscás comodidad sin perder el encanto natural, este es tu lugar.
                </p>
              </div>
            </Col>
          </Row>
        </Container>

        <style jsx>{`
          .linea-titulo {
            flex: 1;
            height: 2px;
            background-color: #2c3e50;
            max-width: 500px;
          }
          .conocenos-card {
            background: white;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: default;
          }
          .conocenos-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }
          .icon-hover {
            transition: transform 0.3s ease;
          }
          .conocenos-card:hover .icon-hover {
            transform: scale(1.1);
            filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.15));
          }
          .subtitulo {
            color: #0B5ED7;
            font-weight: 600;
          }
        `}</style>
      </section>

      <section id="contacto" style={{ padding: "4rem 0", backgroundColor: "#e9ecef", minHeight: "100vh" }}>
        <Container>
          <div className="d-flex align-items-center justify-content-center mb-5">
            <div className="linea-titulo me-3"></div>
            <h2 className="text-center fw-bold m-0" style={{ color: "#2c3e50", whiteSpace: "nowrap" }}>
              Contacto
            </h2>
            <div className="linea-titulo ms-3"></div>
          </div>
          <Row className="justify-content-center">
            <Col md={6} className="d-flex flex-column gap-4">
              <Card className="p-4 shadow">
                <Card.Body className="text-center">
                  <h4 className="mb-4">¿Tenés dudas o querés hacer una reserva?</h4>
                  <p>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                      alt="Email"
                      width={24}
                      className="me-2"
                    />
                    contacto@ecocabañas.com
                  </p>
                  <p>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/455/455705.png"
                      alt="Teléfono"
                      width={24}
                      className="me-2"
                    />
                    +54 9 11 1234-5678
                  </p>
                  <p>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                      alt="Ubicación"
                      width={24}
                      className="me-2"
                    />
                    Villa La Angostura, Neuquen, Patagonia Argentina
                  </p>
                </Card.Body>
              </Card>

              <Card className="p-4 shadow">
                <Card.Body>
                  <h5 className="mb-3" style={{ color: "#2c3e50" }}>Dejanos tu comentario</h5>
                  <form>
                    <div className="mb-3 text-start">
                      <label htmlFor="nombre" className="form-label">Nombre</label>
                      <input type="text" className="form-control" id="nombre" placeholder="Tu nombre" />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="mensaje" className="form-label">Mensaje</label>
                      <textarea className="form-control" id="mensaje" rows="3" placeholder="Tu mensaje" style={{ resize: "none" }}></textarea>
                    </div>
                    <Button variant="primary" className="mt-3">Enviar</Button>
                  </form>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <div style={{ width: "100%", height: "100%", minHeight: "400px", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2137.72276960966!2d-71.67432011558017!3d-40.73570078801973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9610c7002875b2d1%3A0x7df928ea2b33f54a!2sVilla%20la%20Angostura%2CNeuqu%C3%A9n%2CPatagonia%20Argentina!5e0!3m2!1ses!2sar!4v1750380149488!5m2!1ses!2sar"
                  style={{ border: 0, width: "100%", height: "680px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Col>
          </Row>
        </Container>

        <style jsx>{`
          .linea-titulo {
            flex: 1;
            height: 2px;
            background-color: #2c3e50;
            max-width: 500px;
          }
        `}</style>
      </section>
    </div>
  )
}

export default Dashboard;