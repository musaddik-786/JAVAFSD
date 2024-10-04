import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-message">{message}</div>
      <div className="modal-buttons">
        <button className="modal-button" onClick={onConfirm}>Confirm</button>
        <button className="modal-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
