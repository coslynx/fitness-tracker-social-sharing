import { GoalService } from '../../../services/goalService';
import { Goal, GoalCreateInput, GoalUpdateInput } from '../../../models/Goal';
import { createError } from '../../../utils/error';
import { PrismaClient } from '@prisma/client';
import { jest } from '@jest/globals';

const prisma = new PrismaClient();

describe('GoalService', () => {
  let goalService: GoalService;

  beforeEach(() => {
    goalService = new GoalService();
  });

  describe('createGoal', () => {
    it('should create a new goal', async () => {
      const userId = 1;
      const name = 'Test Goal';
      const target = '10';
      const metric = 'kg';
      const goalData: GoalCreateInput = { userId, name, target, metric };

      const newGoal: Goal = await goalService.createGoal(userId, name, target, metric);

      expect(newGoal.userId).toBe(userId);
      expect(newGoal.name).toBe(name);
      expect(newGoal.target).toBe(target);
      expect(newGoal.metric).toBe(metric);
      expect(newGoal.progress).toBe('in progress');
    });

    it('should throw an error if userId is invalid', async () => {
      const userId = 'invalid' as unknown as number;
      const name = 'Test Goal';
      const target = '10';
      const metric = 'kg';
      const goalData: GoalCreateInput = { userId, name, target, metric };

      await expect(goalService.createGoal(userId, name, target, metric)).rejects.toThrowError(
        createError(400, 'Invalid user ID.')
      );
    });

    it('should throw an error if name is invalid', async () => {
      const userId = 1;
      const name = '';
      const target = '10';
      const metric = 'kg';
      const goalData: GoalCreateInput = { userId, name, target, metric };

      await expect(goalService.createGoal(userId, name, target, metric)).rejects.toThrowError(
        createError(400, 'Goal name is required.')
      );
    });

    it('should throw an error if target is invalid', async () => {
      const userId = 1;
      const name = 'Test Goal';
      const target = 'invalid';
      const metric = 'kg';
      const goalData: GoalCreateInput = { userId, name, target, metric };

      await expect(goalService.createGoal(userId, name, target, metric)).rejects.toThrowError(
        createError(400, 'Target value must be a number.')
      );
    });

    it('should throw an error if metric is invalid', async () => {
      const userId = 1;
      const name = 'Test Goal';
      const target = '10';
      const metric = '';
      const goalData: GoalCreateInput = { userId, name, target, metric };

      await expect(goalService.createGoal(userId, name, target, metric)).rejects.toThrowError(
        createError(400, 'Metric is required.')
      );
    });
  });

  describe('getGoalsByUser', () => {
    it('should retrieve all goals for a specific user', async () => {
      const userId = 1;
      const goals = await goalService.getGoalsByUser(userId);

      expect(goals).toBeDefined();
      expect(goals.length).toBeGreaterThanOrEqual(0);
    });

    it('should throw an error if userId is invalid', async () => {
      const userId = 'invalid' as unknown as number;

      await expect(goalService.getGoalsByUser(userId)).rejects.toThrowError(
        createError(400, 'Invalid user ID.')
      );
    });
  });

  describe('getGoalById', () => {
    it('should retrieve a specific goal by ID', async () => {
      const id = 1;
      const goal = await goalService.getGoalById(id);

      expect(goal).toBeDefined();
      expect(goal.id).toBe(id);
    });

    it('should throw an error if id is invalid', async () => {
      const id = 'invalid' as unknown as number;

      await expect(goalService.getGoalById(id)).rejects.toThrowError(
        createError(400, 'Invalid goal ID.')
      );
    });

    it('should throw an error if goal is not found', async () => {
      const id = 999;

      await expect(goalService.getGoalById(id)).rejects.toThrowError(
        createError(404, 'Goal not found')
      );
    });
  });

  describe('updateGoal', () => {
    it('should update an existing goal', async () => {
      const id = 1;
      const name = 'Updated Test Goal';
      const target = '20';
      const metric = 'km';
      const updatedGoalData: GoalUpdateInput = { name, target, metric };

      const updatedGoal = await goalService.updateGoal(id, name, target, metric);

      expect(updatedGoal.id).toBe(id);
      expect(updatedGoal.name).toBe(name);
      expect(updatedGoal.target).toBe(target);
      expect(updatedGoal.metric).toBe(metric);
    });

    it('should throw an error if id is invalid', async () => {
      const id = 'invalid' as unknown as number;
      const name = 'Updated Test Goal';
      const target = '20';
      const metric = 'km';
      const updatedGoalData: GoalUpdateInput = { name, target, metric };

      await expect(goalService.updateGoal(id, name, target, metric)).rejects.toThrowError(
        createError(400, 'Invalid goal ID.')
      );
    });
  });

  describe('deleteGoal', () => {
    it('should delete an existing goal', async () => {
      const id = 1;

      const deleteGoal = jest.fn();
      prisma.goal.delete = deleteGoal;

      await goalService.deleteGoal(id);

      expect(deleteGoal).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw an error if id is invalid', async () => {
      const id = 'invalid' as unknown as number;

      await expect(goalService.deleteGoal(id)).rejects.toThrowError(
        createError(400, 'Invalid goal ID.')
      );
    });
  });
});