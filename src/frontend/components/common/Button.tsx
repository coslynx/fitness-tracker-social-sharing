import React from 'react';
import { ButtonProps } from '@/frontend/types/button';
import 'tailwindcss/tailwind.css';

const Button: React.FC<ButtonProps> = ({ children, variant, disabled, onClick, className, ...rest }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const buttonClasses = `
    ${variant === 'primary' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 
    ${variant === 'primary' ? 'focus:ring-blue-500' : 'focus:ring-gray-400'} 
    ${className}
  `;

  return (
    <button 
      disabled={disabled} 
      className={buttonClasses} 
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;