import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function PublicHome() {
  useEffect(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role"); 
      localStorage.removeItem("userId");
  }, [])


  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <h1 className="mb-4 text-center fs-1">Bienvenido a EcoCabañas</h1>

      <h3 className="text-center mb-4 fs-4">
        Descubrí la tranquilidad de la naturaleza. Alquilá tu cabaña ideal.
      </h3>

      <div className="d-flex gap-3">
        <Link to="/login">
          <Button variant="primary">Iniciar Sesión</Button>
        </Link>

        <Link to="/register">
          <Button variant="success">Registrarse</Button>
        </Link>
      </div>
    </Container>
  );
}

export default PublicHome;
