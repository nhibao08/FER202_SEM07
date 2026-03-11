import { Modal, Button } from "react-bootstrap";

export default function MessageModal({ show, username, onContinue }) {
  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>Login Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Welcome, <b>{username}</b>! Login successful.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onContinue}>Continue</Button>
      </Modal.Footer>
    </Modal>
  );
}