import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          Pizza House
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="pizza-navbar" />
        <Navbar.Collapse id="pizza-navbar">
          {/* Menu */}
          <Nav className="ms-4">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-white fw-semibold" : "text-secondary"
              }
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-white fw-semibold" : "text-secondary"
              }
            >
              About Us
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-white fw-semibold" : "text-secondary"
              }
            >
              Contact
            </Nav.Link>
          </Nav>

          {/* Search */}
          <Form className="ms-auto mt-3 mt-lg-0">
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button variant="danger" type="submit">
                🔍
              </Button>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
