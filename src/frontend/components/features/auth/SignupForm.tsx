import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/frontend/store';
import { useUser } from '@/frontend/hooks/useAuth';
import { motion } from 'framer-motion';
import Input from '@/frontend/components/common/Input';
import Button from '@/frontend/components/common/Button';
import Modal from '@/frontend/components/common/Modal';
import { SignupFormProps } from '@/frontend/types/signupForm';
import 'tailwindcss/tailwind.css';

const SignupForm: React.FC<SignupFormProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { user, setUser, setLoggedIn } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'username':
        setUsername(value);
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        setIsLoading(false);
        return;
      }

      const userData = await response.json();
      setUser(userData);
      setLoggedIn(true);
      setIsLoading(false);
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'An error occurred. Please try again later.' });
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setEmail('');
    setPassword('');
    setUsername('');
    setErrors({});
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Sign Up">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(value) => handleInputChange('email', value)}
          error={errors.email}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(value) => handleInputChange('password', value)}
          error={errors.password}
        />
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(value) => handleInputChange('username', value)}
          error={errors.username}
        />
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </Button>
        {errors.general && (
          <p className="text-red-500 text-sm">{errors.general}</p>
        )}
      </form>
    </Modal>
  );
};

export default SignupForm;