import { Toast, ToastContainer } from "react-bootstrap";
import {
  CheckCircleFill,
  ExclamationTriangleFill,
  PencilSquare,
  TrashFill,
} from "react-bootstrap-icons";

export default function ToastMessage({
  show,
  message,
  type = "success", // success | warning | edit | delete
  onClose,
}) {
  const config = (() => {
    if (type === "warning") {
      return {
        bg: "warning",
        title: "Warning",
        Icon: ExclamationTriangleFill,
        bodyClass: "text-dark",
      };
    }

    if (type === "edit") {
      return {
        bg: "primary",
        title: "Updated",
        Icon: PencilSquare,
        bodyClass: "text-white",
      };
    }

    if (type === "delete") {
      return {
        bg: "danger",
        title: "Deleted",
        Icon: TrashFill,
        bodyClass: "text-white",
      };
    }

    return {
      bg: "success",
      title: "Success",
      Icon: CheckCircleFill,
      bodyClass: "text-white",
    };
  })();

  const { bg, title, Icon, bodyClass } = config;

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <Toast
        show={show}
        onClose={onClose}
        delay={2200}
        autohide
        bg={bg}
        className="shadow rounded-4 border-0"
        style={{ minWidth: 320 }}
      >
        <Toast.Header closeButton className="border-0">
          <Icon className="me-2" />
          <strong className="me-auto">{title}</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body className={bodyClass}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}