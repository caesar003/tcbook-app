import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SignOutModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const showModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  return (
    <Modal
      show={isOpen}
      onHide={closeModal}
      animation={false}
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        Do you really want to sign out?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>this.closeModal()}>
          Cancel
        </Button>
        <Button variant="primary" onClick={()=>this.handleSignOut()}>
          Sign me out
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SignOutModal;
