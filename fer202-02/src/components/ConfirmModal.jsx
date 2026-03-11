import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({ show, title, body, onCancel, onConfirm }) {
  return (
    <Modal show={show} centered onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}