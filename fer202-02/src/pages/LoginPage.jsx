import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { getAccounts } from "../services/accountService";
import MessageModal from "../components/MessageModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {

  const [accounts, setAccounts] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginError, setLoginError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [loginUser, setLoginUser] = useState(null);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAccounts().then(setAccounts);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");
    setLoginError("");

    let valid = true;

    if (!username.trim()) {
      setUsernameError("Username or Email is required.");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!valid) return;

    const user = accounts.find(
      (acc) =>
        (acc.username === username || acc.email === username) &&
        acc.password === password
    );

    if (!user) {
      setLoginError("Invalid username/email or password!");
      return;
    }

    if (user.role !== "admin") {
      alert("Access denied. Only admin users can log in.");
      return;
    }

    if (user.status === "locked") {
      alert("Account is locked. Please contact admin.");
      return;
    }

    setLoginUser(user);
    setShowModal(true);
  };

  const handleContinue = () => {
    setUser(loginUser);
    navigate("/accounts");
  };

  return (
    <Container>
      <Row className="vh-100 justify-content-center align-items-center">

        <Col md={5}>

          <Card>

            <Card.Header className="text-center">
              <h4>Login</h4>
            </Card.Header>

            <Card.Body>

              {loginError && <Alert variant="danger">{loginError}</Alert>}

              <Form onSubmit={handleLogin}>

                <Form.Group className="mb-3">
                  <Form.Label>Username or email</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter username or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={!!usernameError}
                  />

                  <Form.Control.Feedback type="invalid">
                    {usernameError}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!passwordError}
                  />

                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">

                  <Button type="submit" variant="primary" className="w-100">
                    Login
                  </Button>

                  <Button variant="secondary" className="w-100">
                    Cancel
                  </Button>

                </div>

              </Form>

            </Card.Body>

          </Card>

        </Col>

      </Row>

      <MessageModal
        show={showModal}
        username={loginUser?.username}
        onContinue={handleContinue}
      />

    </Container>
  );
}