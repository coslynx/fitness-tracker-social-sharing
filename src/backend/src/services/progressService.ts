import { PrismaClient } from '@prisma/client';
import { createError } from '../utils/error';
import { Progress, ProgressCreateInput, ProgressUpdateInput } from '../models/Progress';

const prisma = new PrismaClient();

export class ProgressService {
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