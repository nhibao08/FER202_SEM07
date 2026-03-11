import { useEffect, useState } from "react";
import { Container, Card, Button, Image, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getAccounts } from "../services/accountService";

export default function AccountDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [acc, setAcc] = useState(null);

  // avatar theo cấu trúc bạn đang có: public/images/*.png
  const avatarSrc = (avatar) => {
    if (!avatar) return "/images/admin.png";
    return avatar.replace("/images/users/", "/images/");
  };

  useEffect(() => {
    getAccounts().then((list) => {
      const found = list.find((a) => String(a.id) === String(id));
      setAcc(found || null);
    });
  }, [id]);

  if (!acc) {
    return (
      <Container className="mt-4" style={{ maxWidth: 900 }}>
        <Card>
          <Card.Header>Account Details</Card.Header>
          <Card.Body>
            <p className="mb-3">Account not found.</p>
            <Button variant="secondary" onClick={() => nav("/accounts")}>
              Back to list
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const roleText = acc.role === "admin" ? "Admin" : "User";
  const statusText = acc.status === "active" ? "Active" : "Locked";

  return (
    <Container className="mt-4" style={{ maxWidth: 900 }}>
      <Card>
        <Card.Header>Account Details</Card.Header>

        <Card.Body>
          <Row className="align-items-start">
            {/* LEFT: avatar */}
            <Col xs={12} md={3} className="d-flex justify-content-center mb-3 mb-md-0">
              <Image
                src={avatarSrc(acc.avatar)}
                roundedCircle
                width={90}
                height={90}
                alt={acc.username}
                style={{ border: "1px solid #ddd" }}
                onError={(e) => (e.currentTarget.src = "/images/admin.png")}
              />
            </Col>

            {/* RIGHT: details */}
            <Col xs={12} md={9}>
              <div className="mb-2">
                <div className="fw-semibold">Username</div>
                <div>{acc.username}</div>
              </div>

              <div className="mb-2">
                <div className="fw-semibold">Email</div>
                <div>{acc.email}</div>
              </div>

              <div className="mb-2">
                <div className="fw-semibold">Role</div>
                <div>{roleText}</div>
              </div>

              <div className="mb-0">
                <div className="fw-semibold">Status</div>
                <div>{statusText}</div>
              </div>
            </Col>
          </Row>
        </Card.Body>

        {/* Footer giống hình: nút nằm dưới card */}
        <Card.Footer>
          <Button variant="secondary" size="sm" onClick={() => nav("/accounts")}>
            Back to list
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}