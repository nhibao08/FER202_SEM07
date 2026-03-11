import { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

const defaultForm = {
  name: "",
  amount: "",
  category: "",
  date: "",
};

export default function ExpenseForm({
  editingExpense,
  onSave,
  onReset,
  categories,
}) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setForm({
        name: editingExpense.name || "",
        amount: editingExpense.amount || "",
        category: editingExpense.category || "",
        date: editingExpense.date || "",
      });
    } else {
      setForm(defaultForm);
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (!form.amount || Number(form.amount) <= 0 || Number.isNaN(Number(form.amount))) {
      newErrors.amount = "Amount must be a valid number greater than 0.";
    }

    if (!form.date) {
      newErrors.date = "Date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...form,
      amount: Number(form.amount),
    });
  };

  const handleReset = () => {
    setForm(defaultForm);
    setErrors({});
    onReset();
  };

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title className="mb-3">
          {editingExpense ? "Edit Expense" : "Add Expense"}
        </Card.Title>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  isInvalid={!!errors.amount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                >
                  <option value="">Select category</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="secondary" type="button" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}