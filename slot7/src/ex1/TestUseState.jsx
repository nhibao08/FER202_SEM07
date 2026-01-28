import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function TestUseState() {
  const [username, setUsername] = useState("traltb");
  const [age, setAge] = useState(18);

  // message ban đầu là null → không hiện
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`Hello, ${username}. You are ${age} years old.`);
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="border border-2 shadow-sm" style={{ width: "480px" }}>
        <Card.Header className="bg-light text-center fw-bold">
          Test useState Hook
        </Card.Header>

        <Card.Body>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <Row className="mb-3 align-items-center">
              <Col md={4}>
                <label className="form-label mb-0">Username</label>
              </Col>
              <Col md={8}>
                <input
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Col>
            </Row>

            {/* Age */}
            <Row className="mb-3 align-items-center">
              <Col md={4}>
                <label className="form-label mb-0">Age</label>
              </Col>
              <Col md={8}>
                <input
                  type="number"
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </Col>
            </Row>

            {/* Submit */}
            <div className="text-center">
              <Button variant="primary" type="submit" className="px-4">
                Submit
              </Button>
            </div>

            {/* Message – chỉ hiện khi đã Submit */}
            {message && (
              <div className="mt-4 text-center">
                <strong>{message}</strong>
              </div>
            )}
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TestUseState;
