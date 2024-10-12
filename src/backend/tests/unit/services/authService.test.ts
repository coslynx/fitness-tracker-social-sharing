import { AuthService } from '../../../services/authService';
import { User, UserCreateInput, UserLoginInput } from '../../../models/User';
import { createError } from '../../../utils/error';
import { hash, compare } from 'bcryptjs'; // Import bcrypt for password hashing
import { sign, verify } from 'jsonwebtoken'; // Import jsonwebtoken for token generation and validation
import { generateRefreshToken, verifyRefreshToken } from '../../../utils/jwt'; // Import custom JWT utilities
import { PrismaClient } from '@prisma/client'; // Import Prisma client for database interactions

const prisma = new PrismaClient();

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const username = 'testuser';
      const userData: UserCreateInput = { email, password, username };

      const newUser: User = await authService.signup(email, password, username);

      expect(newUser.email).toBe(email);
      expect(newUser.username).toBe(username);
    });

    it('should throw an error if email is invalid', async () => {
      const email = 'invalid';
      const password = 'password123';
      const username = 'testuser';

      await expect(authService.signup(email, password, username)).rejects.toThrowError(
        createError(400, 'Invalid email format.')
      );
    });

    it('should throw an error if password is invalid', async () => {
      const email = 'test@example.com';
      const password = 'invalid';
      const username = 'testuser';

      await expect(authService.signup(email, password, username)).rejects.toThrowError(
        createError(400, 'Password must be at least 8 characters long.')
      );
    });

    it('should throw an error if username is invalid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const username = 'invalid';

      await expect(authService.signup(email, password, username)).rejects.toThrowError(
        createError(400, 'Username must be at least 3 characters long.')
      );
    });

    it('should throw an error if user already exists', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const username = 'testuser';

      await expect(authService.signup(email, password, username)).rejects.toThrowError(
        createError(409, 'User already exists.')
      );
    });
  });

  describe('login', () => {
    it('should authenticate an existing user', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const loginData: UserLoginInput = { email, password };

      const token: string = await authService.login(email, password);

      expect(token).toBeDefined();
    });

    it('should throw an error for invalid credentials', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      const loginData: UserLoginInput = { email, password };

      await expect(authService.login(email, password)).rejects.toThrowError(
        createError(401, 'Invalid credentials.')
      );
    });

    it('should throw an error for non-existent user', async () => {
      const email = 'nonexistent@example.com';
      const password = 'password123';
      const loginData: UserLoginInput = { email, password };

      await expect(authService.login(email, password)).rejects.toThrowError(
        createError(401, 'Invalid credentials.')
      );
    });
  });

  describe('generateAccessToken', () => {
    it('should generate a new access token', async () => {
      const userId = 1;

      const accessToken = await authService.generateAccessToken(userId);

      expect(accessToken).toBeDefined();
    });
  });

  describe('validateRefreshToken', () => {
    it('should validate a valid refresh token', async () => {
      const userId = 1;
      const refreshToken = generateRefreshToken({ id: userId });

      const decodedToken = await authService.validateRefreshToken(refreshToken);

      expect(decodedToken).toBeDefined();
      expect(decodedToken.id).toBe(userId);
    });

    it('should throw an error for an invalid refresh token', async () => {
      const invalidRefreshToken = 'invalid-refresh-token';

      await expect(authService.validateRefreshToken(invalidRefreshToken)).rejects.toThrowError(
        createError(403, 'Invalid refresh token.')
      );
    });
  });
});