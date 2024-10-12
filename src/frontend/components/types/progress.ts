import { Goal } from './goal';

export interface Progress {
  id: number;
  goal: Goal;
  goalId: number;
  date: Date;
  value: string;
  description?: string;
  user: { id: number; email: string; username: string };
  userId: number;
}

export interface ProgressCreateInput {
  goalId: number;
  value: string;
  description?: string;
}

export interface ProgressUpdateInput {
  value?: string;
  description?: string;
}

export interface ProgressLogProps {
  goalId: number;
}

export interface ProgressChartProps {
  goalId: number;
}