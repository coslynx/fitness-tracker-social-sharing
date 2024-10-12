import React from 'react';
import { useStore } from '@/frontend/store'; // Import the Zustand store for global state management
import { useGoalData } from '@/frontend/hooks/useGoals'; // Import the `useGoalData` hook to fetch and manage goal data
import { useProgressData } from '@/frontend/hooks/useProgress'; // Import the `useProgressData` hook to fetch and manage progress data
import { useUser } from '@/frontend/hooks/useAuth'; // Import the `useUser` hook to access user authentication details
import { Goal } from '@/frontend/types/goal'; // Import the `Goal` interface to define the structure of goal data
import { Progress } from '@/frontend/types/progress'; // Import the `Progress` interface to define the structure of progress data
import { Chart, registerables } from 'chart.js'; // Import Chart.js library for creating charts
import { useMemo } from 'react'; // Import the `useMemo` hook for memoizing calculations
import 'chart.js/auto'; // Import the Chart.js auto configuration for common chart types

Chart.register(...registerables); // Register Chart.js components and plugins

const DashboardStats: React.FC = () => {
  const { user } = useUser(); // Get the authenticated user from the `useUser` hook
  const { goals, fetchGoals } = useGoalData(); // Fetch and manage goal data using the `useGoalData` hook
  const { progresses, fetchProgresses } = useProgressData(); // Fetch and manage progress data using the `useProgressData` hook

  // Load initial data on component mount
  React.useEffect(() => {
    if (user) {
      fetchGoals();
      fetchProgresses();
    }
  }, [user, fetchGoals, fetchProgresses]);

  const totalGoals = useMemo(() => goals.length, [goals]); // Memoize the total goals count for performance optimization
  const completedGoals = useMemo(() => {
    return goals.filter((goal: Goal) => goal.progress === 'completed').length;
  }, [goals]); // Memoize the completed goals count for performance optimization

  const recentProgress = useMemo(() => {
    // Calculate the most recent progress entries for each goal
    // ...
    return [
      // ... recent progress entries
    ];
  }, [progresses]); // Memoize the recent progress data for performance optimization

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg flex items-center">
          <svg
            className="w-6 h-6 text-blue-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <div>
            <h3 className="text-lg font-bold">Total Goals</h3>
            <p className="text-gray-600">{totalGoals}</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex items-center">
          <svg
            className="w-6 h-6 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <div>
            <h3 className="text-lg font-bold">Completed Goals</h3>
            <p className="text-gray-600">{completedGoals}</p>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center">
          <svg
            className="w-6 h-6 text-gray-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="text-lg font-bold">Recent Progress</h3>
            <ul className="list-disc text-gray-600 pl-6">
              {recentProgress.map((progress: Progress) => (
                <li key={progress.id}>{progress.description}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Add a section for visualizing progress with a chart using Chart.js */}
      {user && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Progress Visualization</h3>
          <canvas id="progressChart" />
        </div>
      )}
      {/* ... */}
    </div>
  );
};

export default DashboardStats;