import { PrismaClient } from '@prisma/client';
import { createError } from '../utils/error';

const prisma = new PrismaClient();

export interface Goal {
  id: number;
  userId: number;
  name: string;
  target: string;
  metric: string;
  progress: string;
}

export interface GoalCreateInput {
  userId: number;
  name: string;
  target: string;
  metric: string;
}

export interface GoalUpdateInput {
  name?: string;
  target?: string;
  metric?: string;
}

export class GoalService {
  /**
   * @description Creates a new goal for a specific user.
   * @param userId The ID of the user creating the goal.
   * @param name The name of the goal.
   * @param target The target value for the goal.
   * @param metric The metric used for the target (e.g., "kg", "miles").
   * @returns The newly created goal.
   */
  async createGoal(userId: number, name: string, target: string, metric: string): Promise<Goal> {
    try {
      const newGoal = await prisma.goal.create({
        data: {
          userId,
          name,
          target,
          metric,
          progress: 'in progress',
        },
      });
      return newGoal;
    } catch (error) {
      console.error('Error creating goal:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to create goal.');
    }
  }

  /**
   * @description Retrieves all goals for a specific user.
   * @param userId The ID of the user for whom to retrieve goals.
   * @returns An array of goals associated with the given user.
   */
  async getGoalsByUser(userId: number): Promise<Goal[]> {
    try {
      const goals = await prisma.goal.findMany({
        where: { userId },
        orderBy: { id: 'asc' },
      });
      return goals;
    } catch (error) {
      console.error('Error fetching goals:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to fetch goals.');
    }
  }

  /**
   * @description Retrieves a specific goal by ID.
   * @param id The ID of the goal to retrieve.
   * @returns The goal with the specified ID.
   */
  async getGoalById(id: number): Promise<Goal> {
    try {
      const goal = await prisma.goal.findUnique({
        where: { id },
      });
      if (!goal) {
        throw createError(404, 'Goal not found');
      }
      return goal;
    } catch (error) {
      console.error('Error fetching goal:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to fetch goal.');
    }
  }

  /**
   * @description Updates an existing goal.
   * @param id The ID of the goal to update.
   * @param name The new name for the goal (optional).
   * @param target The new target value for the goal (optional).
   * @param metric The new metric for the goal (optional).
   * @returns The updated goal.
   */
  async updateGoal(id: number, name?: string, target?: string, metric?: string): Promise<Goal> {
    try {
      const updatedGoal = await prisma.goal.update({
        where: { id },
        data: { name, target, metric },
      });
      return updatedGoal;
    } catch (error) {
      console.error('Error updating goal:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to update goal.');
    }
  }

  /**
   * @description Deletes an existing goal.
   * @param id The ID of the goal to delete.
   */
  async deleteGoal(id: number): Promise<void> {
    try {
      await prisma.goal.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to delete goal.');
    }
  }
}