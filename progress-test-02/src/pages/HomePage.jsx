import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "../components/Header";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import FilterBar from "../components/FilterBar";
import ConfirmModal from "../components/ConfirmModal";
import ToastMessage from "../components/ToastMessage";
import { useAuth } from "../contexts/AuthContext";
import {
  getExpenses,
  addExpenseApi,
  updateExpenseApi,
  deleteExpenseApi,
} from "../services/api";
import { formatCurrency } from "../utils/format";

export default function HomePage() {
  const { user } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [targetDelete, setTargetDelete] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    getExpenses()
      .then((data) => {
        const userExpenses = data.filter(
          (e) => String(e.userId) === String(user.id)
        );
        setExpenses(userExpenses);
      })
      .catch(() => {
        setToastType("warning");
        setToastMsg("Cannot load expenses.");
        setShowToast(true);
      });
  }, [user.id]);

  const categories = useMemo(() => {
    return [...new Set(expenses.map((e) => e.category).filter(Boolean))];
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    if (!keyword) return expenses;
    return expenses.filter((e) => e.category === keyword);
  }, [expenses, keyword]);

  const total = useMemo(() => {
    return filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
  }, [filteredExpenses]);

  const handleSaveExpense = async (formData) => {
    try {
      if (editingExpense) {
        const payload = {
          ...editingExpense,
          ...formData,
          userId: user.id,
        };

        const updated = await updateExpenseApi(editingExpense.id, payload);

        setExpenses((prev) =>
          prev.map((e) => (String(e.id) === String(updated.id) ? updated : e))
        );

        setEditingExpense(null);
        setToastType("edit");
        setToastMsg("Expense updated successfully.");
        setShowToast(true);
        return;
      }

      const payload = {
        ...formData,
        userId: user.id,
      };

      const created = await addExpenseApi(payload);
      setExpenses((prev) => [...prev, created]);
      setToastType("success");
      setToastMsg("Expense added successfully.");
      setShowToast(true);
    } catch {
      setToastType("warning");
      setToastMsg("Operation failed. Please check JSON Server.");
      setShowToast(true);
    }
  };

  const handleResetForm = () => {
    setEditingExpense(null);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleAskDelete = (expense) => {
    setTargetDelete(expense);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!targetDelete) return;

    try {
      await deleteExpenseApi(targetDelete.id);
      setExpenses((prev) =>
        prev.filter((e) => String(e.id) !== String(targetDelete.id))
      );

      if (editingExpense && String(editingExpense.id) === String(targetDelete.id)) {
        setEditingExpense(null);
      }

      setToastType("delete");
      setToastMsg("Expense deleted successfully.");
      setShowToast(true);
    } catch {
      setToastType("warning");
      setToastMsg("Delete failed. Please check JSON Server.");
      setShowToast(true);
    } finally {
      setShowConfirm(false);
      setTargetDelete(null);
    }
  };

  return (
    <>
      <Header />

      {/* cùng width với Header */}
      <Container className="mb-4">
        <Row className="mb-3">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Total of Expenses</Card.Title>
                <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                  {formatCurrency(total)}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <FilterBar
              keyword={keyword}
              setKeyword={setKeyword}
              categories={categories}
            />
          </Col>
        </Row>

        <Row className="align-items-stretch">
          <Col md={4} className="mb-3 d-flex">
            <div className="w-100">
              <ExpenseForm
                editingExpense={editingExpense}
                onSave={handleSaveExpense}
                onReset={handleResetForm}
                categories={categories}
              />
            </div>
          </Col>

          <Col md={8} className="mb-3 d-flex">
            <div className="w-100">
              <ExpenseTable
                expenses={filteredExpenses}
                onEdit={handleEdit}
                onDelete={handleAskDelete}
              />
            </div>
          </Col>
        </Row>

        <footer className="d-flex justify-content-between text-muted small py-3 border-top">
          <span>© 2025 PersonalBudget Demo</span>
          <span>Built with React, Redux Toolkit & JSON Server</span>
        </footer>
      </Container>

      <ConfirmModal
        show={showConfirm}
        title="Delete Expense"
        body={
          <>
            Delete expense <b>{targetDelete?.name}</b>?
          </>
        }
        onCancel={() => {
          setShowConfirm(false);
          setTargetDelete(null);
        }}
        onConfirm={handleDelete}
      />

      <ToastMessage
        show={showToast}
        message={toastMsg}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}