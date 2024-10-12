import { PrismaClient } from '@prisma/client';
import { createError } from './error';

const prisma = new PrismaClient();

export class DatabaseService {
  /**
   * @description Creates a new user in the database.
   * @param email The user's email address.
   * @param password The user's password.
   * @param username The user's username.
   * @returns The newly created user.
   */
  async createUser(email: string, password: string, username: string): Promise<User> {
    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          password,
          username,
        },
      });
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to create user.');
    }
  }

  /**
   * @description Retrieves a specific user by ID.
   * @param id The ID of the user to retrieve.
   * @returns The user with the specified ID.
   */
  async getUserById(id: number): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          goals: true,
        },
      });
      if (!user) {
        throw createError(404, 'User not found');
      }
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to fetch user.');
    }
  }

  /**
   * @description Updates an existing user account.
   * @param id The ID of the user to update.
   * @param email The new email address for the user (optional).
   * @param password The new password for the user (optional).
   * @param username The new username for the user (optional).
   * @returns The updated user.
   */
  async updateUser(id: number, email?: string, password?: string, username?: string): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { email, password, username },
      });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to update user.');
    }
  }

  /**
   * @description Deletes an existing user account.
   * @param id The ID of the user to delete.
   */
  async deleteUser(id: number): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to delete user.');
    }
  }

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

  /**
   * @description Creates a new progress entry for a specific goal.
   * @param goalId The ID of the goal for which the progress is being recorded.
   * @param value The numerical value of the progress achieved.
   * @param description An optional description of the progress achieved.
   * @returns The newly created progress entry.
   */
  async createProgress(goalId: number, value: string, description?: string): Promise<Progress> {
    try {
      const newProgress = await prisma.progress.create({
        data: {
          goalId,
          value,
          description,
          userId: 1, // Replace with actual user ID from authenticated request
          date: new Date(),
        },
      });
      return newProgress;
    } catch (error) {
      console.error('Error creating progress:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to create progress.');
    }
  }

  /**
   * @description Retrieves all progress entries for a specific goal.
   * @param goalId The ID of the goal for which to retrieve progress entries.
   * @returns An array of progress entries associated with the given goal.
   */
  async getProgressByGoal(goalId: number): Promise<Progress[]> {
    try {
      const progresses = await prisma.progress.findMany({
        where: { goalId },
        orderBy: { date: 'desc' },
      });
      return progresses;
    } catch (error) {
      console.error('Error fetching progress:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to fetch progress.');
    }
  }

  /**
   * @description Updates an existing progress entry.
   * @param id The ID of the progress entry to update.
   * @param value The new value for the progress entry.
   * @param description An optional new description for the progress entry.
   * @returns The updated progress entry.
   */
  async updateProgress(id: number, value?: string, description?: string): Promise<Progress> {
    try {
      const updatedProgress = await prisma.progress.update({
        where: { id },
        data: { value, description },
      });
      return updatedProgress;
    } catch (error) {
      console.error('Error updating progress:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to update progress.');
    }
  }

  /**
   * @description Deletes an existing progress entry.
   * @param id The ID of the progress entry to delete.
   */
  async deleteProgress(id: number): Promise<void> {
    try {
      await prisma.progress.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting progress:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to delete progress.');
    }
  }
}