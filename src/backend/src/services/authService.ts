import { PrismaClient } from '@prisma/client';
import { createError } from '../utils/error';
import { User, UserCreateInput } from '../models/User';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { UserLoginInput } from '../models/User';

const prisma = new PrismaClient();

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

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
        },
      });

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
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw createError(401, 'Invalid credentials.');
      }

      const isPasswordCorrect = await compare(password, user.password);
      if (!isPasswordCorrect) {
        throw createError(401, 'Invalid credentials.');
      }

      // Generate and sign an access token.
      const accessToken = sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '15m', // Token expiry time (15 minutes)
      });

      // Generate a refresh token (with a longer expiry time).
      const refreshToken = generateRefreshToken({ id: user.id });

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
      const accessToken = sign({ id: userId }, process.env.JWT_SECRET!, {
        expiresIn: '15m', // Token expiry time (15 minutes)
      });

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
      const decodedToken = verifyRefreshToken(refreshToken);
      if (!decodedToken) {
        throw createError(403, 'Invalid refresh token.');
      }
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