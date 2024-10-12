import { ProgressService } from '../../../services/progressService';
import { Progress, ProgressCreateInput, ProgressUpdateInput } from '../../../models/Progress';
import { createError } from '../../../utils/error';
import { PrismaClient } from '@prisma/client';
import { jest } from '@jest/globals';

const prisma = new PrismaClient();

describe('ProgressService', () => {
  let progressService: ProgressService;

  beforeEach(() => {
    progressService = new ProgressService();
  });

  describe('createProgress', () => {
    it('should create a new progress entry', async () => {
      const goalId = 1;
      const value = '5';
      const description = 'Made progress today!';
      const progressData: ProgressCreateInput = { goalId, value, description };

      const newProgress: Progress = await progressService.createProgress(goalId, value, description);

      expect(newProgress.goalId).toBe(goalId);
      expect(newProgress.value).toBe(value);
      expect(newProgress.description).toBe(description);
      expect(newProgress.userId).toBe(1); // Assuming user ID is 1 for this test
      expect(newProgress.date).toBeDefined();
    });

    it('should throw an error if goalId is invalid', async () => {
      const goalId = 'invalid' as unknown as number;
      const value = '5';
      const description = 'Made progress today!';
      const progressData: ProgressCreateInput = { goalId, value, description };

      await expect(progressService.createProgress(goalId, value, description)).rejects.toThrowError(
        createError(400, 'Invalid goal ID.')
      );
    });

    it('should throw an error if value is invalid', async () => {
      const goalId = 1;
      const value = 'invalid' as unknown as string;
      const description = 'Made progress today!';
      const progressData: ProgressCreateInput = { goalId, value, description };

      await expect(progressService.createProgress(goalId, value, description)).rejects.toThrowError(
        createError(400, 'Invalid progress value.')
      );
    });

    it('should throw an error if description is too long', async () => {
      const goalId = 1;
      const value = '5';
      const description = 'This description is way too long and exceeds the maximum allowed length of 250 characters. It is longer than 250 characters.';
      const progressData: ProgressCreateInput = { goalId, value, description };

      await expect(progressService.createProgress(goalId, value, description)).rejects.toThrowError(
        createError(400, 'Description is too long.')
      );
    });
  });

  describe('getProgressByGoal', () => {
    it('should retrieve all progress entries for a specific goal', async () => {
      const goalId = 1;
      const progresses = await progressService.getProgressByGoal(goalId);

      expect(progresses).toBeDefined();
      expect(progresses.length).toBeGreaterThanOrEqual(0);
    });

    it('should throw an error if goalId is invalid', async () => {
      const goalId = 'invalid' as unknown as number;

      await expect(progressService.getProgressByGoal(goalId)).rejects.toThrowError(
        createError(400, 'Invalid goal ID.')
      );
    });
  });

  describe('updateProgress', () => {
    it('should update an existing progress entry', async () => {
      const id = 1;
      const value = '7';
      const description = 'Updated progress!';
      const updatedProgressData: ProgressUpdateInput = { value, description };

      const updatedProgress = await progressService.updateProgress(id, value, description);

      expect(updatedProgress.id).toBe(id);
      expect(updatedProgress.value).toBe(value);
      expect(updatedProgress.description).toBe(description);
    });

    it('should throw an error if id is invalid', async () => {
      const id = 'invalid' as unknown as number;
      const value = '7';
      const description = 'Updated progress!';
      const updatedProgressData: ProgressUpdateInput = { value, description };

      await expect(progressService.updateProgress(id, value, description)).rejects.toThrowError(
        createError(400, 'Invalid progress ID.')
      );
    });

    it('should throw an error if value is invalid', async () => {
      const id = 1;
      const value = 'invalid' as unknown as string;
      const description = 'Updated progress!';
      const updatedProgressData: ProgressUpdateInput = { value, description };

      await expect(progressService.updateProgress(id, value, description)).rejects.toThrowError(
        createError(400, 'Invalid progress value.')
      );
    });

    it('should throw an error if description is too long', async () => {
      const id = 1;
      const value = '7';
      const description = 'This description is way too long and exceeds the maximum allowed length of 250 characters. It is longer than 250 characters.';
      const updatedProgressData: ProgressUpdateInput = { value, description };

      await expect(progressService.updateProgress(id, value, description)).rejects.toThrowError(
        createError(400, 'Description is too long.')
      );
    });
  });

  describe('deleteProgress', () => {
    it('should delete an existing progress entry', async () => {
      const id = 1;

      const deleteProgress = jest.fn();
      prisma.progress.delete = deleteProgress;

      await progressService.deleteProgress(id);

      expect(deleteProgress).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw an error if id is invalid', async () => {
      const id = 'invalid' as unknown as number;

      await expect(progressService.deleteProgress(id)).rejects.toThrowError(
        createError(400, 'Invalid progress ID.')
      );
    });
  });
});