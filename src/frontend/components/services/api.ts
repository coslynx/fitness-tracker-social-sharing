import { useFetch } from "@/frontend/hooks/useFetch";
import { useUser } from "@/frontend/hooks/useAuth";
import { useState, useEffect } from "react";
import { Goal, GoalCreateInput, GoalUpdateInput } from "@/frontend/types/goal";
import { Progress, ProgressCreateInput, ProgressUpdateInput } from "@/frontend/types/progress";

export const useGoals = (): {
  goals: Goal[];
  isLoading: boolean;
  error: string | null;
  fetchGoals: () => void;
  createGoal: (goalData: GoalCreateInput) => Promise<void>;
  updateGoal: (goalId: number, updatedGoalData: GoalUpdateInput) => Promise<void>;
  deleteGoal: (goalId: number) => Promise<void>;
} => {
  const { user } = useUser();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { fetchData, isLoading: fetchIsLoading, error: fetchError } = useFetch<Goal[]>(
    "/api/goals",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      cacheKey: "goals",
    }
  );

  const fetchGoals = () => {
    setIsLoading(true);
    fetchData()
      .then((data) => {
        setGoals(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  const createGoal = async (goalData: GoalCreateInput) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        throw new Error("Failed to create goal");
      }

      const newGoal = await response.json();
      setGoals([...goals, newGoal]);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const updateGoal = async (goalId: number, updatedGoalData: GoalUpdateInput) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(updatedGoalData),
      });

      if (!response.ok) {
        throw new Error("Failed to update goal");
      }

      const updatedGoal = await response.json();
      setGoals(goals.map((goal) => (goal.id === goalId ? updatedGoal : goal)));
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const deleteGoal = async (goalId: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete goal");
      }

      setGoals(goals.filter((goal) => goal.id !== goalId));
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  return {
    goals,
    isLoading: isLoading || fetchIsLoading,
    error: error || fetchError,
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
  };
};

export const useProgress = ({ goalId }: { goalId: number }): {
  progresses: Progress[];
  isLoading: boolean;
  error: string | null;
  fetchProgresses: () => void;
  createProgress: (progressData: ProgressCreateInput) => Promise<void>;
  updateProgress: (progressId: number, updatedProgressData: ProgressUpdateInput) => Promise<void>;
  deleteProgress: (progressId: number) => Promise<void>;
  goal: Goal | undefined;
} => {
  const { user } = useUser();
  const { goals } = useGoals();
  const [progresses, setProgresses] = useState<Progress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { fetchData, isLoading: fetchIsLoading, error: fetchError } = useFetch<Progress[]>(
    `/api/progress?goalId=${goalId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      cacheKey: `progress-${goalId}`,
    }
  );

  const fetchProgresses = () => {
    setIsLoading(true);
    fetchData()
      .then((data) => {
        setProgresses(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  const createProgress = async (progressData: ProgressCreateInput) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(progressData),
      });

      if (!response.ok) {
        throw new Error("Failed to create progress");
      }

      const newProgress = await response.json();
      setProgresses([...progresses, newProgress]);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const updateProgress = async (progressId: number, updatedProgressData: ProgressUpdateInput) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/progress/${progressId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(updatedProgressData),
      });

      if (!response.ok) {
        throw new Error("Failed to update progress");
      }

      const updatedProgress = await response.json();
      setProgresses(progresses.map((progress) => (progress.id === progressId ? updatedProgress : progress)));
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const deleteProgress = async (progressId: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/progress/${progressId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete progress");
      }

      setProgresses(progresses.filter((progress) => progress.id !== progressId));
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user && goalId) {
      fetchProgresses();
    }
  }, [user, goalId]);

  const goal = goals.find((goal: Goal) => goal.id === goalId);

  return {
    progresses,
    isLoading: isLoading || fetchIsLoading,
    error: error || fetchError,
    fetchProgresses,
    createProgress,
    updateProgress,
    deleteProgress,
    goal,
  };
};