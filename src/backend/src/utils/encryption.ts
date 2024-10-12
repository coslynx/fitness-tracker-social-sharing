import { createError } from './error';
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { User, UserCreateInput, UserLoginInput } from '../models/User';
import { generateRefreshToken, verifyRefreshToken } from './jwt';

// Import the Prisma client for database interactions, ensuring type safety.
import { PrismaClient } from '@prisma/client';

// Initialize the Prisma client for interacting with the database.
const prisma = new PrismaClient();

// Define the AuthService class, which handles all authentication-related operations.
export class AuthService {
  /**
   * @description Registers a new user account.
   * @param email The user's email address.
   * @param password The user's password.
   * @param username The user's username.
   * @returns The newly created user.
   */
  async signup(email: string, password: string, username: string): Promise<User> {
    try {
      // Check if the user already exists.
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw createError(409, 'User already exists.');
      }

      // Hash the password before storing.
      const hashedPassword = await hash(password, 12);

      // Create the new user in the database.
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
        },
      });

      // Return the newly created user.
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to create user.');
    }
  }

  /**
   * @description Authenticates an existing user.
   * @param email The user's email address.
   * @param password The user's password.
   * @returns The authentication token.
   */
  async login(email: string, password: string): Promise<string> {
    try {
      // Retrieve the user from the database using their email.
      const user = await prisma.user.findUnique({
        where: { email },
      });

      // Check if the user exists.
      if (!user) {
        throw createError(401, 'Invalid credentials.');
      }

      // Compare the provided password with the hashed password stored in the database.
      const isPasswordCorrect = await compare(password, user.password);
      if (!isPasswordCorrect) {
        throw createError(401, 'Invalid credentials.');
      }

      // Generate and sign an access token.
      const accessToken = sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '15m', // Token expiry time (15 minutes).
      });

      // Generate a refresh token (with a longer expiry time).
      const refreshToken = generateRefreshToken({ id: user.id });

      // Return the access token for authentication.
      return accessToken;
    } catch (error) {
      console.error('Error logging in:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to log in.');
    }
  }

  /**
   * @description Generates a new access token using a refresh token.
   * @param userId The user's ID.
   * @returns The new access token.
   */
  async generateAccessToken(userId: number): Promise<string> {
    try {
      // Generate and sign a new access token using the user ID.
      const accessToken = sign({ id: userId }, process.env.JWT_SECRET!, {
        expiresIn: '15m', // Token expiry time (15 minutes).
      });

      // Return the newly generated access token.
      return accessToken;
    } catch (error) {
      console.error('Error generating access token:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to generate access token.');
    }
  }

  /**
   * @description Validates a refresh token.
   * @param refreshToken The refresh token to validate.
   * @returns The decoded refresh token payload, or null if invalid.
   */
  async validateRefreshToken(refreshToken: string): Promise<any> {
    try {
      // Verify the refresh token.
      const decodedToken = verifyRefreshToken(refreshToken);
      if (!decodedToken) {
        throw createError(403, 'Invalid refresh token.');
      }

      // Return the decoded refresh token payload.
      return decodedToken;
    } catch (error) {
      console.error('Error validating refresh token:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to validate refresh token.');
    }
  }
}