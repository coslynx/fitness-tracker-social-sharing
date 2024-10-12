import { Request, Response } from 'express';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware'; 
import { createError } from '../utils/error'; 
import { verifyToken } from '../utils/jwt'; 

const router = require('express').Router();

// Authentication Routes 

router.post('/signup', authController.signup); 

router.post('/login', authController.login); 

router.post('/refresh-token', (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json(createError(401, 'Refresh token not found'));
    }

    const decodedToken = verifyToken(refreshToken);

    if (!decodedToken) {
      return res.status(403).json(createError(403, 'Invalid refresh token'));
    }

    const userId = decodedToken.id;

    // Generate new access token using the userId
    const authService = new AuthService();
    const accessToken = await authService.generateAccessToken(userId);

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.status(200).json({ message: 'Token refreshed successfully', accessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(500).json(createError(500, 'Failed to refresh token'));
  }
});

// Other potential authentication-related routes 

router.get('/verify-email', (req: Request, res: Response) => {
  // Implement logic for verifying user emails
});

router.post('/forgot-password', (req: Request, res: Response) => {
  // Implement logic for password reset
});

// Protected Routes

router.get('/profile', authMiddleware, (req: Request, res: Response) => {
  // Implement logic for retrieving user profile information
  res.status(200).json(req.user);
});

export default router;