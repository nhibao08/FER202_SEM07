import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError("Cannot connect to JSON Server."));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setUsernameError("");
    setPasswordError("");

    let valid = true;

    if (!username.trim()) {
      setUsernameError("Username is required.");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!username.trim() && !password.trim()) {
      setError("Username and password are required");
    }

    if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }

    if (!valid) return;

    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) {
      setError("Invalid username or password");
      return;
    }

    setUser(found);
    navigate("/home");
  };

  return (
    <Container>
      <Row className="vh-100 justify-content-center align-items-center">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header className="text-center">
              <h4 className="mb-0">Login</h4>
            </Card.Header>

            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    isInvalid={!!passwordError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}