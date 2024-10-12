import React, { useEffect, useState } from 'react';
import { useProgress } from '@/frontend/hooks/useProgress';
import { useGoals } from '@/frontend/hooks/useGoals';
import { Goal } from '@/frontend/types/goal';
import { Progress } from '@/frontend/types/progress';
import { Chart, registerables } from 'chart.js';
import 'chart.js/auto';
import 'tailwindcss/tailwind.css';

Chart.register(...registerables);

interface ProgressChartProps {
  goalId: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId }) => {
  const { progresses, fetchProgresses, isLoading, error } = useProgress();
  const { goals, fetchGoals } = useGoals();
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (goalId) {
      fetchProgresses(goalId);
    }
  }, [goalId, fetchProgresses]);

  useEffect(() => {
    const goal = goals.find((goal: Goal) => goal.id === goalId) as Goal | undefined;
    const canvasRef = document.getElementById('progressChart') as HTMLCanvasElement | null;

    if (goal && canvasRef) {
      const chartData = {
        labels: progresses.map((progress: Progress) => new Date(progress.date).toLocaleDateString()),
        datasets: [
          {
            label: goal.name,
            data: progresses.map((progress: Progress) => progress.value),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };

      const newChart = new Chart(canvasRef, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      setChart(newChart);
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [progresses, goals, goalId, chart]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Progress for {goalId}</h2>
      {isLoading && <Spinner />}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <canvas id="progressChart" />
    </div>
  );
};

export default ProgressChart;