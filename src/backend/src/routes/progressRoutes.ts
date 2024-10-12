import { Request, Response } from 'express';
import { ProgressService } from '../services/progressService';
import { createError } from '../utils/error';

export const progressController = {
  /**
   * @description Create a new progress entry for a specific goal.
   * @param req Request object containing the progress details and goal ID.
   * @param res Response object to send the created progress entry or error.
   * @returns Response object with the created progress entry or error.
   */
  createProgress: async (req: Request, res: Response) => {
    try {
      const { goalId, value, description } = req.body;

      if (!Number.isInteger(goalId)) {
        return res.status(400).json(createError(400, 'Invalid goal ID.'));
      }

      if (!/^\d+$/.test(value)) {
        return res.status(400).json(createError(400, 'Invalid progress value.'));
      }

      if (description && description.length > 250) {
        return res.status(400).json(createError(400, 'Description is too long.'));
      }

      const progressService = new ProgressService();
      const progress = await progressService.createProgress(goalId, value, description);

      res.status(201).json(progress);
    } catch (error) {
      console.error('Error creating progress:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to create progress.'));
    }
  },

  /**
   * @description Get all progress entries for a specific goal.
   * @param req Request object containing the goal ID.
   * @param res Response object to send the list of progress entries or error.
   * @returns Response object with the list of progress entries or error.
   */
  getProgressByGoal: async (req: Request, res: Response) => {
    try {
      const { goalId } = req.params;

      if (!Number.isInteger(parseInt(goalId))) {
        return res.status(400).json(createError(400, 'Invalid goal ID.'));
      }

      const progressService = new ProgressService();
      const progresses = await progressService.getProgressByGoal(parseInt(goalId));

      res.status(200).json(progresses);
    } catch (error) {
      console.error('Error fetching progress:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to fetch progress.'));
    }
  },

  /**
   * @description Update an existing progress entry.
   * @param req Request object containing the progress ID and updated data.
   * @param res Response object to send the updated progress entry or error.
   * @returns Response object with the updated progress entry or error.
   */
  updateProgress: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { value, description } = req.body;

      if (!Number.isInteger(parseInt(id))) {
        return res.status(400).json(createError(400, 'Invalid progress ID.'));
      }

      if (!/^\d+$/.test(value)) {
        return res.status(400).json(createError(400, 'Invalid progress value.'));
      }

      if (description && description.length > 250) {
        return res.status(400).json(createError(400, 'Description is too long.'));
      }

      const progressService = new ProgressService();
      const progress = await progressService.updateProgress(parseInt(id), value, description);

      res.status(200).json(progress);
    } catch (error) {
      console.error('Error updating progress:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to update progress.'));
    }
  },

  /**
   * @description Delete an existing progress entry.
   * @param req Request object containing the progress ID.
   * @param res Response object to send success or error.
   * @returns Response object with success or error.
   */
  deleteProgress: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!Number.isInteger(parseInt(id))) {
        return res.status(400).json(createError(400, 'Invalid progress ID.'));
      }

      const progressService = new ProgressService();
      await progressService.deleteProgress(parseInt(id));

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting progress:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to delete progress.'));
    }
  },
};