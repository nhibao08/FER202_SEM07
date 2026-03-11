import { Card, Table, Button } from "react-bootstrap";
import { formatCurrency, formatDate } from "../utils/format";

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title className="mb-3">Expense Management</Card.Title>

        <Table bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th style={{ width: 140 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{formatCurrency(expense.amount)}</td>
                <td>{expense.category}</td>
                <td>{formatDate(expense.date)}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => onEdit(expense)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(expense)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

            {expenses.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}