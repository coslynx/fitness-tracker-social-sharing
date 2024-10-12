import React from 'react';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';

const Spinner: React.FC = () => {
  const spinnerVariants = {
    rotate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        variants={spinnerVariants}
        animate="rotate"
        className="w-12 h-12 border-4 border-gray-400 rounded-full animate-spin"
      />
    </div>
  );
};

export default Spinner;