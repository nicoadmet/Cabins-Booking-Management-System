import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import BackgroundHomeImg from '../assets/bg-home.png';

function PublicHome() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 
    localStorage.removeItem("userId");
  }, []);

  return (
<div className="bg-home" style={{ backgroundImage: `url(${BackgroundHomeImg})` }}>
  <div className="left-container"></div>

  <div className="right-container">
    <div className="content-box">
      <h1 className="fw-bold">Bienvenido a EcoCabañas</h1>
      <p>Explorá nuestras cabañas ecológicas.</p>
      <div className="button-group">
        <Link to="/login">
          <button className="btn primary">Iniciar sesión</button>
        </Link>
        <Link to="/register">
          <button className="btn secondary">Registrarse</button>
        </Link>
      </div>
    </div>
  </div>
</div>

  );
}

export default PublicHome;
