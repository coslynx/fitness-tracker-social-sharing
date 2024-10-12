import React, { useState, useEffect } from 'react';
import { useStore } from '@/frontend/store';
import { useGoals } from '@/frontend/hooks/useGoals';
import { Goal } from '@/frontend/types/goal';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/frontend/components/common/Button';
import Spinner from '@/frontend/components/common/Spinner';

// Import Tailwind CSS for styling
import 'tailwindcss/tailwind.css';

const GoalList: React.FC = () => {
  const { user } = useStore();
  const router = useRouter();
  const { goals, fetchGoals, isLoading, error } = useGoals();

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user, fetchGoals]);

  // Handle goal deletion
  const handleDeleteGoal = async (goalId: number) => {
    try {
      await deleteGoal(goalId);
      fetchGoals();
    } catch (error) {
      // Handle error
    }
  };

  // Handle goal editing
  const handleEditGoal = (goal: Goal) => {
    router.push(`/goals/${goal.id}`);
  };

  // Goal list animation variants
  const goalListVariants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Goals</h2>
      {isLoading && <Spinner />}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {goals.length === 0 && !isLoading && (
        <p className="text-gray-600">No goals yet. Add a new goal!</p>
      )}
      {goals.length > 0 && (
        <motion.div
          variants={goalListVariants}
          animate="visible"
          initial="hidden"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {goals.map((goal: Goal) => (
            <div
              key={goal.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start"
            >
              <h3 className="text-lg font-bold mb-2">{goal.name}</h3>
              <p className="text-gray-600 mb-2">
                Target: {goal.target} {goal.metric}
              </p>
              <p className="text-gray-600 mb-2">
                Progress: {goal.progress}
              </p>
              {/* Display additional goal information here as needed */}
              <div className="flex space-x-2 mt-4">
                <Button
                  variant="primary"
                  onClick={() => handleEditGoal(goal)}
                >
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleDeleteGoal(goal.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default GoalList;