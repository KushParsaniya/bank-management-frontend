import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import '../style/navbar.css'

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="body-tertiary navbar-dark text-white">
      <Container>
        <Navbar.Brand href="/home">Easy-Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/notice" className="text-light">Notice</Nav.Link>
            <NavDropdown title="Account" id="collapsible-nav-dropdown" >
              <NavDropdown.Item href="/signup">
                <Nav.Link href="/signup" className="text-dark">Create Account</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="/close">
                <Nav.Link href="/close" className="text-dark">Close Account</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/contact">
                <Nav.Link href="/contact" className="text-dark">Contact Us</Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <Nav.Link eventKey={1} href="/login" className="text-light">
              Log In
            </Nav.Link>
            <Nav.Link eventKey={2} href="/aboutus" className="text-light">
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
