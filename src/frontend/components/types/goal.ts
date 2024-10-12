import { Goal, GoalCreateInput, GoalUpdateInput } from './goal';

export interface GoalsService {
  fetchGoals: () => Promise<Goal[]>;
  createGoal: (goalData: GoalCreateInput) => Promise<Goal>;
  updateGoal: (goalId: number, updatedGoalData: GoalUpdateInput) => Promise<Goal>;
  deleteGoal: (goalId: number) => Promise<void>;
}

export interface GoalProps {
  goal: Goal;
}

export interface GoalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface GoalListProps {
  goals: Goal[];
  isLoading: boolean;
  error: string | null;
  fetchGoals: () => void;
  deleteGoal: (goalId: number) => Promise<void>;
  editGoal: (goal: Goal) => void;
}

export interface GoalCreateInput {
  name: string;
  target: string;
  metric: string;
  userId: number;
}

export interface GoalUpdateInput {
  name?: string;
  target?: string;
  metric?: string;
}

export interface Goal {
  id: number;
  name: string;
  target: string;
  metric: string;
  progress: string;
  userId: number;
  user: {
    id: number;
    email: string;
    username: string;
  };
}