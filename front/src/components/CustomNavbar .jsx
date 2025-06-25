import { Button, Container, Nav, Navbar} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


export const CustomNavbar  = ({ userRole }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 
    localStorage.removeItem("userId");
    navigate("/login");               
  };

  const role = localStorage.getItem("role");

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
            {(userRole === "admin" || role === "admin") && (
              <Link to="/adminPanel">
                <Button variant="warning" size="sm">
                  Panel de Administración
                </Button>
              </Link>
            )}
            <Button onClick={handleLogout} variant="outline-danger" size="sm" >
              Cerrar sesión
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar ;