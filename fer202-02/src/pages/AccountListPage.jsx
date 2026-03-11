import { useEffect, useMemo, useState } from "react";
import { Container, Table, Button, Image, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import ConfirmModal from "../components/ConfirmModal";
import ToastMessage from "../components/ToastMessage";
import { getAccounts, updateAccountStatus } from "../services/accountService";
import { useAuth } from "../contexts/AuthContext";

export default function AccountListPage() {
  const [accounts, setAccounts] = useState([]);

  // ✅ fix avatar theo cấu trúc bạn: public/images/*.png
  const avatarSrc = (avatar) => {
    if (!avatar) return "/images/admin.png";
    return avatar.replace("/images/users/", "/images/");
  };

  // filter/sort states
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");
  const [sort, setSort] = useState("username-asc");

  // confirm modal states
  const [showConfirm, setShowConfirm] = useState(false);
  const [targetAcc, setTargetAcc] = useState(null);

  // toast states (✅ thêm type cho toast đẹp)
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success"); // lock | unlock | warning | success

  const nav = useNavigate();
  const { user } = useAuth(); // admin đang login

  useEffect(() => {
    getAccounts().then(setAccounts);
  }, []);

  const filtered = useMemo(() => {
    let list = [...accounts];

    const keyword = q.trim().toLowerCase();
    if (keyword) {
      list = list.filter(
        (a) =>
          a.username.toLowerCase().includes(keyword) ||
          a.email.toLowerCase().includes(keyword)
      );
    }

    if (status !== "all") list = list.filter((a) => a.status === status);
    if (role !== "all") list = list.filter((a) => a.role === role);

    if (sort === "username-asc") {
      list.sort((a, b) => a.username.localeCompare(b.username));
    } else if (sort === "username-desc") {
      list.sort((a, b) => b.username.localeCompare(a.username));
    } else if (sort === "role") {
      list.sort((a, b) =>
        a.role === b.role ? 0 : a.role === "admin" ? -1 : 1
      );
    } else if (sort === "status") {
      list.sort((a, b) =>
        a.status === b.status ? 0 : a.status === "active" ? -1 : 1
      );
    }

    return list;
  }, [accounts, q, status, role, sort]);

  const openConfirm = (acc) => {
    // không tự lock chính mình
    if (user && acc.id === user.id && acc.status === "active") {
      setToastType("warning");
      setToastMsg("Warning: You cannot lock your own account.");
      setShowToast(true);
      return;
    }
    setTargetAcc(acc);
    setShowConfirm(true);
  };

  const closeConfirm = () => {
    setShowConfirm(false);
    setTargetAcc(null);
  };

  const handleConfirm = async () => {
    if (!targetAcc) return;

    const newStatus = targetAcc.status === "active" ? "locked" : "active";

    try {
      const updated = await updateAccountStatus(targetAcc.id, newStatus);

      // update row in-place (không reload trang)
      setAccounts((prev) =>
        prev.map((a) =>
          a.id === updated.id ? { ...a, status: updated.status } : a
        )
      );

      if (newStatus === "locked") {
        setToastType("lock");
        setToastMsg("Locked successfully");
      } else {
        setToastType("unlock");
        setToastMsg("Unlocked successfully");
      }
      setShowToast(true);
    } catch (e) {
      setToastType("warning");
      setToastMsg("Update failed. Please check JSON Server.");
      setShowToast(true);
    } finally {
      closeConfirm();
    }
  };

  const confirmBody = useMemo(() => {
    if (!targetAcc) return "";
    if (targetAcc.status === "active") {
      return (
        <>
          Lock account <b>{targetAcc.username}</b>? The user cannot log in after this.
        </>
      );
    }
    return (
      <>
        Unlock account <b>{targetAcc.username}</b>?
      </>
    );
  }, [targetAcc]);

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Account Management</h3>

      <FilterBar
        q={q}
        setQ={setQ}
        status={status}
        setStatus={setStatus}
        role={role}
        setRole={setRole}
        sort={sort}
        setSort={setSort}
      />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th style={{ width: 220 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((acc) => (
            <tr key={acc.id}>
              <td>
                <Image
                  src={avatarSrc(acc.avatar)}
                  alt={acc.username}
                  roundedCircle
                  width={40}
                  height={40}
                  onError={(e) => {
                    e.currentTarget.src = "/images/admin.png";
                  }}
                />
              </td>
              <td>{acc.username}</td>
              <td>{acc.email}</td>
              <td>
                <Badge bg={acc.role === "admin" ? "primary" : "secondary"}>
                  {acc.role}
                </Badge>
              </td>
              <td>
                <Badge bg={acc.status === "active" ? "success" : "danger"}>
                  {acc.status}
                </Badge>
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => nav(`/accounts/${acc.id}`)}
                >
                  View Details
                </Button>{" "}
                <Button
                  variant={acc.status === "active" ? "warning" : "success"}
                  size="sm"
                  onClick={() => openConfirm(acc)}
                >
                  {acc.status === "active" ? "Lock" : "Unlock"}
                </Button>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No accounts found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <ConfirmModal
        show={showConfirm}
        title="Confirm Action"
        body={confirmBody}
        onCancel={closeConfirm}
        onConfirm={handleConfirm}
      />

      <ToastMessage
        show={showToast}
        message={toastMsg}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </Container>
  );
}