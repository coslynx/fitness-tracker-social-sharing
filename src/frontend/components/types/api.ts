import { Goal, GoalCreateInput, GoalUpdateInput } from "@/frontend/types/goal";
import { Progress, ProgressCreateInput, ProgressUpdateInput } from "@/frontend/types/progress";

export interface Api {
  goals: {
    fetchGoals: () => Promise<Goal[]>;
    createGoal: (goalData: GoalCreateInput) => Promise<Goal>;
    updateGoal: (goalId: number, updatedGoalData: GoalUpdateInput) => Promise<Goal>;
    deleteGoal: (goalId: number) => Promise<void>;
  };
  progress: {
    fetchProgresses: (goalId: number) => Promise<Progress[]>;
    createProgress: (progressData: ProgressCreateInput) => Promise<Progress>;
    updateProgress: (progressId: number, updatedProgressData: ProgressUpdateInput) => Promise<Progress>;
    deleteProgress: (progressId: number) => Promise<void>;
  };
}