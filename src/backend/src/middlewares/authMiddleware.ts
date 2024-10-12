import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { createError } from '../utils/error';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return next(createError(401, 'You are not authenticated!'));
    }

    const isValidToken = verifyToken(token);

    if (!isValidToken) {
      return next(createError(403, 'Invalid token!'));
    }

    req.user = isValidToken; // Attach the user data to the request object
    next();
  } catch (error) {
    next(createError(500, 'Internal server error!'));
  }
};