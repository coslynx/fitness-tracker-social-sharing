import { Request, Response } from 'express';
import { GoalService } from '../services/goalService';
import { createError } from '../utils/error';

export const goalController = {
  /**
   * @description Create a new goal for a specific user.
   * @param req Request object containing the goal details and user ID.
   * @param res Response object to send the created goal or error.
   * @returns Response object with the created goal or error.
   */
  createGoal: async (req: Request, res: Response) => {
    try {
      const { name, target, metric } = req.body;
      const userId = req.user.id; // Access user ID from authenticated request (ensure authMiddleware is applied)

      const goalService = new GoalService();
      const goal = await goalService.createGoal(userId, name, target, metric);

      res.status(201).json(goal);
    } catch (error) {
      console.error('Error creating goal:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to create goal.'));
    }
  },

  /**
   * @description Get all goals for a specific user.
   * @param req Request object containing the user ID.
   * @param res Response object to send the list of goals or error.
   * @returns Response object with the list of goals or error.
   */
  getGoalsByUser: async (req: Request, res: Response) => {
    try {
      const userId = req.user.id; // Access user ID from authenticated request (ensure authMiddleware is applied)

      const goalService = new GoalService();
      const goals = await goalService.getGoalsByUser(userId);

      res.status(200).json(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to fetch goals.'));
    }
  },

  /**
   * @description Get a specific goal by ID.
   * @param req Request object containing the goal ID.
   * @param res Response object to send the goal or error.
   * @returns Response object with the goal or error.
   */
  getGoalById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const goalService = new GoalService();
      const goal = await goalService.getGoalById(parseInt(id));

      res.status(200).json(goal);
    } catch (error) {
      console.error('Error fetching goal:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to fetch goal.'));
    }
  },

  /**
   * @description Update an existing goal.
   * @param req Request object containing the goal ID and updated data.
   * @param res Response object to send the updated goal or error.
   * @returns Response object with the updated goal or error.
   */
  updateGoal: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, target, metric } = req.body;

      const goalService = new GoalService();
      const goal = await goalService.updateGoal(parseInt(id), name, target, metric);

      res.status(200).json(goal);
    } catch (error) {
      console.error('Error updating goal:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to update goal.'));
    }
  },

  /**
   * @description Delete an existing goal.
   * @param req Request object containing the goal ID.
   * @param res Response object to send success or error.
   * @returns Response object with success or error.
   */
  deleteGoal: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const goalService = new GoalService();
      await goalService.deleteGoal(parseInt(id));

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting goal:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to delete goal.'));
    }
  },
};