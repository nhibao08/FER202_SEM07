import { Navbar, Container, Button } from "react-bootstrap";
import { PiggyBankFill } from "react-bootstrap-icons";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="light" className="border-bottom mb-4 py-2">
      {/* dùng Container thay vì Container fluid để canh cùng mép body */}
      <Container>
        <Navbar.Brand className="fw-bold d-flex align-items-center mb-0">
          <PiggyBankFill className="me-2 text-success" />
          PersonalBudget
        </Navbar.Brand>

        <div className="d-flex align-items-center">
          <small className="text-muted me-3">
            Signed in as <b>{user?.fullName}</b>
          </small>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}