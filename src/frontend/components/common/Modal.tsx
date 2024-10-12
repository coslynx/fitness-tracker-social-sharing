import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '@/frontend/context/AuthContext';
import { useStore } from '@/frontend/store';
import { ModalProps } from '@/frontend/types/modal';
import 'tailwindcss/tailwind.css';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);
  const store = useStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleClose = () => {
    onClose();
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
  };

  return (
    <motion.div
      variants={backdropVariants}
      animate={isOpen ? 'visible' : 'hidden'}
      className="fixed inset-0 bg-black z-50"
      onClick={handleClose}
    >
      <motion.div
        variants={modalVariants}
        animate={isOpen ? 'visible' : 'hidden'}
        className="fixed inset-0 flex items-center justify-center z-50"
        ref={modalRef}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 max-w-xl">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <div>{children}</div>
          {isLoading && <div className="mt-4">Loading...</div>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;