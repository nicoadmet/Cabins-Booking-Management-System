import { jwtDecode } from 'jwt-decode';
import { Button, Container, Nav, Navbar} from 'react-bootstrap';
import { Link, Links, useNavigate } from 'react-router-dom';


export const CustomNavbar  = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let role = "user";
  
  if (token) {
    role = jwtDecode(token)?.role || "user";
  }
  console.log(role);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");               
  };
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#">EcoCabañas</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link href="#cabañas">Cabañas</Nav.Link>
            <Nav.Link href="#conocenos">Conocenos</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/bookings">Mis Reservas</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {(role === "admin") && (
              <Link to="/adminPanel">
                <Button variant="warning" size="sm">
                  Panel de Administración
                </Button>
              </Link>
            )}
            {token 
            ? <Button onClick={handleLogout} variant="outline-danger" size="sm" >
                Cerrar sesión
              </Button>
            : <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to="/login">
                  <Button className='btn-primary' size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline-primary" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </div> 
            }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar ;