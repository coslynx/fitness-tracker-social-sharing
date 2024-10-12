import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { createError } from '../utils/error';
import { authMiddleware } from '../middlewares/authMiddleware'; // Import the authentication middleware

export const userController = {
  /**
   * @description Create a new user account.
   * @param req Request object containing user details.
   * @param res Response object to send the created user or error.
   * @returns Response object with the created user or error.
   */
  createUser: async (req: Request, res: Response) => {
    try {
      const { email, password, username } = req.body;

      const userService = new UserService();
      const user = await userService.createUser(email, password, username);

      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to create user.'));
    }
  },

  /**
   * @description Get a specific user by ID.
   * @param req Request object containing the user ID.
   * @param res Response object to send the user or error.
   * @returns Response object with the user or error.
   */
  getUserById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const userService = new UserService();
      const user = await userService.getUserById(parseInt(id));

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to fetch user.'));
    }
  },

  /**
   * @description Update an existing user account.
   * @param req Request object containing the user ID and updated data.
   * @param res Response object to send the updated user or error.
   * @returns Response object with the updated user or error.
   */
  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { email, password, username } = req.body;

      const userService = new UserService();
      const user = await userService.updateUser(parseInt(id), email, password, username);

      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to update user.'));
    }
  },

  /**
   * @description Delete an existing user account.
   * @param req Request object containing the user ID.
   * @param res Response object to send success or error.
   * @returns Response object with success or error.
   */
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const userService = new UserService();
      await userService.deleteUser(parseInt(id));

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to delete user.'));
    }
  },
};

const router = require('express').Router();

router.post('/create', userController.createUser); // Create a new user
router.get('/:id', authMiddleware, userController.getUserById); // Get a specific user by ID (protected route)
router.put('/:id', authMiddleware, userController.updateUser); // Update an existing user (protected route)
router.delete('/:id', authMiddleware, userController.deleteUser); // Delete a user (protected route)

export default router;