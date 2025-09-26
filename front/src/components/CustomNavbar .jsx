import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';


export const CustomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const token = localStorage.getItem('token');
  let role = 'user';

  if (token) {
    try {
      role = jwtDecode(token)?.role || 'user';
    } catch (error) {
      console.error('Error al decodificar token:', error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/login');
  };

  // Estado para detectar si se hizo scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className={`py-3 transition-navbar ${scrolled ? 'bg-white shadow-sm' : 'bg-white'}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <span className="fw-bold fs-4 text-success">EcoCabañas</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {isHomePage ? (
              <>
                <Nav.Link href="#cabanas">Cabañas</Nav.Link>
                <Nav.Link href="#conocenos">Conocenos</Nav.Link>
                <Nav.Link href="#contacto">Contacto</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/?scroll=cabañas">Cabañas</Nav.Link>
                <Nav.Link as={Link} to="/?scroll=conocenos">Conocenos</Nav.Link>
                <Nav.Link as={Link} to="/?scroll=contacto">Contacto</Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/bookings">Mis Reservas</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {role === 'admin' && (
              <Link to="/adminPanel">
                <Button variant="warning" size="sm">
                  Panel de Administración
                </Button>
              </Link>
            )}

            {token ? (
              <Button onClick={handleLogout} variant="outline-danger" size="sm">
                <FaSignOutAlt className="me-1" />Cerrar sesión
              </Button>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login">
                  <Button variant="success" size="ms">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline-success" size="ms">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
