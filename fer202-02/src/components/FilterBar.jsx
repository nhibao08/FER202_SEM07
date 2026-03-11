import { Row, Col, Form } from "react-bootstrap";

export default function FilterBar({
  q, setQ,
  status, setStatus,
  role, setRole,
  sort, setSort
}) {
  return (
    <Row className="g-2 mb-3">
      <Col md={4}>
        <Form.Control
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search username or email..."
        />
      </Col>

      <Col md={2}>
        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Status: All</option>
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </Form.Select>
      </Col>

      <Col md={2}>
        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="all">Role: All</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Form.Select>
      </Col>

      <Col md={4}>
        <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="username-asc">Username A→Z</option>
          <option value="username-desc">Username Z→A</option>
          <option value="role">Role (Admin/User)</option>
          <option value="status">Status (Active/Locked)</option>
        </Form.Select>
      </Col>
    </Row>
  );
}