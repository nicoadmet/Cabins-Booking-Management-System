import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import BackgroundImg from '../assets/background-img.png';

function PublicHome() {
  useEffect(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role"); 
      localStorage.removeItem("userId");
  }, [])


  return (
    <div
      style={{
        backgroundImage:`url(${BackgroundImg})`,
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
      className="d-flex flex-column justify-content-center align-items-center rounded"
      style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          height: '38vh',
          width: '80vh',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          color: 'rgb(255, 255, 255)',
        }}
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
    </div>
    
  );
}

export default PublicHome;
