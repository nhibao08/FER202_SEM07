import { Toast, ToastContainer } from "react-bootstrap";
import { CheckCircleFill, LockFill, UnlockFill, ExclamationTriangleFill } from "react-bootstrap-icons";

export default function ToastMessage({
  show,
  message,
  type = "success", // "lock" | "unlock" | "success" | "warning"
  onClose,
}) {
  const bg = (() => {
    if (type === "lock") return "danger";
    if (type === "unlock") return "success";
    if (type === "warning") return "warning";
    return "success";
  })();

  const Icon = (() => {
    if (type === "lock") return LockFill;
    if (type === "unlock") return UnlockFill;
    if (type === "warning") return ExclamationTriangleFill;
    return CheckCircleFill;
  })();

  const title = (() => {
    if (type === "lock") return "Account Locked";
    if (type === "unlock") return "Account Unlocked";
    if (type === "warning") return "Warning";
    return "Success";
  })();

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <Toast
        show={show}
        onClose={onClose}
        delay={2500}
        autohide
        bg={bg}
        className="shadow rounded-4 border-0"
        style={{ minWidth: 320 }}
      >
        <Toast.Header closeButton className="border-0" style={{ opacity: 0.95 }}>
          <Icon className="me-2" />
          <strong className="me-auto">{title}</strong>
          <small>now</small>
        </Toast.Header>

        <Toast.Body className={bg === "warning" ? "text-dark" : "text-white"}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}