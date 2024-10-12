import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { createError } from '../utils/error';

export const authController = {
  /**
   * @description Register a new user account.
   * @param req Request object containing user details.
   * @param res Response object to send the created user or error.
   * @returns Response object with the created user or error.
   */
  signup: async (req: Request, res: Response) => {
    try {
      const { email, password, username } = req.body;

      const authService = new AuthService();
      const user = await authService.signup(email, password, username);

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
   * @description Authenticate an existing user.
   * @param req Request object containing user credentials.
   * @param res Response object to send the authentication token or error.
   * @returns Response object with the authentication token or error.
   */
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const authService = new AuthService();
      const token = await authService.login(email, password);

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      if (error instanceof Error) {
        return res.status(400).json(createError(error.message));
      }
      return res.status(500).json(createError('Failed to log in.'));
    }
  },
};