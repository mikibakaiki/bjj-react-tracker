import React from 'react';
import './Modal.css';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <>
      <div className="kimono-graph-overlay" onClick={onClose}></div>
      <div className="kimono-graph-modal">
        {children}
      </div>
    </>
  );
}

export default Modal;