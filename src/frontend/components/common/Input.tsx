import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { InputProps } from '@/frontend/types/input';
import 'tailwindcss/tailwind.css';

const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>> = forwardRef<
  HTMLInputElement,
  InputProps
>((props, ref) => {
  const { type, placeholder, value, onChange, error, disabled, className, ...rest } = props;
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  useEffect(() => {
    const handleFocus = () => setFocus(true);
    const handleBlur = () => setFocus(false);
    inputRef.current?.addEventListener('focus', handleFocus);
    inputRef.current?.addEventListener('blur', handleBlur);
    return () => {
      inputRef.current?.removeEventListener('focus', handleFocus);
      inputRef.current?.removeEventListener('blur', handleBlur);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <motion.div
      className={`relative ${className} ${focus && 'ring-2 ring-blue-500'} ${error && 'border-red-500'} ${disabled && 'opacity-50 cursor-not-allowed'}`}
      animate={{ scale: focus ? 1.05 : 1 }}
      transition={{ duration: 0.1 }}
    >
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error && 'border-red-500'} ${disabled && 'opacity-50 cursor-not-allowed'}`}
        {...rest}
      />
      {error && (
        <p className="absolute bottom-0 left-0 px-2 py-1 text-red-500 text-xs font-bold rounded-md bg-red-100">
          {error}
        </p>
      )}
    </motion.div>
  );
});

export default Input;