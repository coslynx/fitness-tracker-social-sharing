import React, { useState, useEffect } from 'react';
import { useStore } from '@/frontend/store';
import { useRouter } from 'next/navigation';
import { useGoals } from '@/frontend/hooks/useGoals';
import { Progress } from '@/frontend/types/progress';
import { motion } from 'framer-motion';
import Button from '@/frontend/components/common/Button';
import Spinner from '@/frontend/components/common/Spinner';
import Modal from '@/frontend/components/common/Modal';
import { ProgressLogProps } from '@/frontend/types/progressLog';
import { useProgress } from '@/frontend/hooks/useProgress';
import 'tailwindcss/tailwind.css';
import { useUser } from '@/frontend/hooks/useAuth';

const ProgressLog: React.FC<ProgressLogProps> = ({ goalId }) => {
  const { user } = useUser();
  const router = useRouter();
  const { goals, fetchGoals } = useGoals();
  const { progresses, fetchProgresses, createProgress, isLoading, error, updateProgress, deleteProgress } =
    useProgress();
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState<Progress | null>(null);

  useEffect(() => {
    if (user && goalId) {
      fetchProgresses(goalId);
    }
  }, [user, goalId, fetchProgresses]);

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'description':
        setDescription(value);
        break;
      case 'value':
        setValue(value);
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    try {
      await createProgress({ goalId, value, description });
      setDescription('');
      setValue('');
      fetchProgresses(goalId);
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      }
    }
  };

  const handleDeleteProgress = async (progressId: number) => {
    try {
      await deleteProgress(progressId);
      fetchProgresses(goalId);
    } catch (error) {
      // Handle error
    }
  };

  const handleEditProgress = (progress: Progress) => {
    setSelectedProgress(progress);
    setDescription(progress.description || '');
    setValue(progress.value);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProgress(null);
    setDescription('');
    setValue('');
    setErrors({});
  };

  const handleModalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    try {
      if (selectedProgress) {
        await updateProgress(selectedProgress.id, { value, description });
        handleModalClose();
        fetchProgresses(goalId);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      }
    }
  };

  const goal = goals.find((goal) => goal.id === goalId);

  return (
    <div className="container mx-auto py-12 px-4">
      {isLoading && <Spinner />}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {goal && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Progress for {goal.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {progresses.length > 0 && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
                }}
                animate="visible"
                initial="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {progresses.map((progress) => (
                  <div
                    key={progress.id}
                    className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start"
                  >
                    <h3 className="text-lg font-bold mb-2">
                      {progress.description || 'Progress Update'}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Date: {new Date(progress.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mb-2">
                      Value: {progress.value}
                    </p>
                    <div className="flex space-x-2 mt-4">
                      <Button
                        variant="primary"
                        onClick={() => handleEditProgress(progress)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleDeleteProgress(progress.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            {progresses.length === 0 && !isLoading && (
              <p className="text-gray-600">No progress entries yet.</p>
            )}
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <h3 className="text-lg font-bold mb-2">Add New Progress Entry</h3>
            <div className="grid grid-cols-1 gap-4">
              <Input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(value) => handleInputChange('description', value)}
                error={errors.description}
              />
              <Input
                type="number"
                placeholder="Value"
                value={value}
                onChange={(value) => handleInputChange('value', value)}
                error={errors.value}
              />
            </div>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Adding Progress...' : 'Add Progress'}
            </Button>
            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}
          </form>
        </>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Edit Progress">
          <form onSubmit={handleModalSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(value) => handleInputChange('description', value)}
              error={errors.description}
            />
            <Input
              type="number"
              placeholder="Value"
              value={value}
              onChange={(value) => handleInputChange('value', value)}
              error={errors.value}
            />
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Updating Progress...' : 'Update Progress'}
            </Button>
            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ProgressLog;