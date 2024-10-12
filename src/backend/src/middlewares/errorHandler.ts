import { Request, Response, NextFunction } from 'express';
import { createError } from '../utils/error';

/**
 * @description Global error handler middleware for the backend API.
 * 
 * This middleware catches unhandled errors during API requests and sends appropriate error responses to the client.
 * 
 * @param req Express request object.
 * @param res Express response object.
 * @param next Express next function to move to the next middleware or route handler.
 * 
 * @returns Sends an error response with a status code and error message to the client.
 */
export const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500; 
  const message = err.message || 'Internal Server Error';

  // Log the error details for debugging.
  console.error('Error occurred:', err); 

  // Construct an error object with appropriate formatting.
  const error = {
    statusCode, 
    message,
  };

  // Send the error response to the client.
  res.status(statusCode).json(error); 
};