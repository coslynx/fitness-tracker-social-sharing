import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/frontend/store';
import { useGoals } from '@/frontend/hooks/useGoals';
import { Goal } from '@/frontend/types/goal';
import { motion } from 'framer-motion';
import Input from '@/frontend/components/common/Input';
import Button from '@/frontend/components/common/Button';
import Modal from '@/frontend/components/common/Modal';
import { GoalFormProps } from '@/frontend/types/goalForm';
import 'tailwindcss/tailwind.css';

const GoalForm: React.FC<GoalFormProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { user } = useStore();
  const { createGoal, isLoading, error } = useGoals();
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [metric, setMetric] = useState('');
  const [errors, setErrors] = useState({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'target':
        setTarget(value);
        break;
      case 'metric':
        setMetric(value);
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    try {
      await createGoal({ name, target, metric, userId: user?.id });
      onClose();
      setName('');
      setTarget('');
      setMetric('');
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      }
    }
  };

  const handleClose = () => {
    onClose();
    setName('');
    setTarget('');
    setMetric('');
    setErrors({});
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Goal">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Goal Name"
          value={name}
          onChange={(value) => handleInputChange('name', value)}
          error={errors.name}
        />
        <Input
          type="text"
          placeholder="Target"
          value={target}
          onChange={(value) => handleInputChange('target', value)}
          error={errors.target}
        />
        <Input
          type="text"
          placeholder="Metric"
          value={metric}
          onChange={(value) => handleInputChange('metric', value)}
          error={errors.metric}
        />
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Goal...' : 'Create Goal'}
        </Button>
        {errors.general && (
          <p className="text-red-500 text-sm">{errors.general}</p>
        )}
      </form>
    </Modal>
  );
};

export default GoalForm;