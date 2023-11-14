import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import '../style/navbar.css'

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="body-tertiary navbar-light">
      <Container>
        <Navbar.Brand href="/home">Easy-Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/notice">Notice</Nav.Link>
            <NavDropdown title="Account" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/signup">
                <Nav.Link href="/signup">Create Account</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="/close">
                <Nav.Link href="/close">Close Account</Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/contact">
                <Nav.Link href="/contact">Contact Us</Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <Nav.Link eventKey={1} href="/login">
              Log In
            </Nav.Link>
            <Nav.Link eventKey={2} href="/aboutus">
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
