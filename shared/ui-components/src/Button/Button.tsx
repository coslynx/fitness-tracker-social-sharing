import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ButtonProps } from '@/frontend/types/button';
import 'tailwindcss/tailwind.css';
import { useStore } from '@/frontend/store';
import { useUser } from '@/frontend/hooks/useAuth';

// Import Tailwind CSS for styling
import 'tailwindcss/tailwind.css';

// Import the necessary components from the shared UI library (if applicable)
// ...

const Button: React.FC<ButtonProps> = ({ children, variant, disabled, onClick, className, ...rest }) => {
  const { user } = useUser(); // Access user data from the `useUser` hook
  const [isLoading, setIsLoading] = useState(false); // State for handling loading states
  const buttonRef = useRef<HTMLButtonElement>(null); // Reference to the button element for potential interactions

  // Function to handle button click events
  const handleClick = async () => {
    if (onClick) {
      setIsLoading(true); // Set loading state to true before executing onClick
      try {
        await onClick(); // Execute the provided onClick function
      } catch (error) {
        // Handle any potential errors from onClick function execution
        console.error('Button click error:', error);
      } finally {
        setIsLoading(false); // Set loading state back to false after completion
      }
    }
  };

  // Define button styling classes based on variant, disabled state, and user authentication
  const buttonClasses = `
    ${variant === 'primary' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 
    ${variant === 'primary' ? 'focus:ring-blue-500' : 'focus:ring-gray-400'} 
    ${className}
  `;

  // Render the button component with dynamic styling and loading indicator
  return (
    <button
      ref={buttonRef} // Attach reference to the button element
      disabled={disabled || isLoading} // Disable the button during loading
      className={buttonClasses}
      onClick={handleClick}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="w-4 h-4 mr-2 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5a4.581 4.581 0 00-4.582-4.582m0 0H9m-2 2h.582m-2 2h11.178"
            />
          </svg>
          Loading...
        </div>
      ) : (
        children // Render the button's children (text) if not loading
      )}
    </button>
  );
};

export default Button;