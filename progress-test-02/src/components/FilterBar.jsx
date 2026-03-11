import { Card, Form } from "react-bootstrap";

export default function FilterBar({ keyword, setKeyword, categories }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3">Filter</Card.Title>

        <Form.Group>
          <Form.Label className="mb-1">Category</Form.Label>
          <Form.Select
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}