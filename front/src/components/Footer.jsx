import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#2c3e50", color: "#fff", padding: "2rem 0" }}>
      <Container className="text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} EcoCabañas. Todos los derechos reservados.
        </p>
        <p className="mb-0">
          <a style={{ color: "#fff", textDecoration: "none" }}>
            contacto@ecocabañas.com
          </a>{" "}
          |{" "}
          <a style={{ color: "#fff", textDecoration: "none" }}>
            +54 9 11 1234-5678
          </a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
