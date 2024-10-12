import { UserService } from '../../../services/userService';
import { User, UserCreateInput, UserUpdateInput } from '../../../models/User';
import { createError } from '../../../utils/error';
import { PrismaClient } from '@prisma/client';
import { jest } from '@jest/globals';

const prisma = new PrismaClient();

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const username = 'testuser';
      const userData: UserCreateInput = { email, password, username };

      const newUser: User = await userService.createUser(email, password, username);

      expect(newUser.email).toBe(email);
      expect(newUser.username).toBe(username);
    });

    it('should throw an error if email is invalid', async () => {
      const email = 'invalid';
      const password = 'password123';
      const username = 'testuser';
      const userData: UserCreateInput = { email, password, username };

      await expect(userService.createUser(email, password, username)).rejects.toThrowError(
        createError(400, 'Invalid email format.')
      );
    });

    it('should throw an error if password is invalid', async () => {
      const email = 'test@example.com';
      const password = 'invalid';
      const username = 'testuser';
      const userData: UserCreateInput = { email, password, username };

      await expect(userService.createUser(email, password, username)).rejects.toThrowError(
        createError(400, 'Password must be at least 8 characters long.')
      );
    });

    it('should throw an error if username is invalid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const username = 'invalid';
      const userData: UserCreateInput = { email, password, username };

      await expect(userService.createUser(email, password, username)).rejects.toThrowError(
        createError(400, 'Username must be at least 3 characters long.')
      );
    });

    it('should throw an error if user already exists', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const username = 'testuser';
      const userData: UserCreateInput = { email, password, username };

      await expect(userService.createUser(email, password, username)).rejects.toThrowError(
        createError(409, 'User already exists.')
      );
    });
  });

  describe('getUserById', () => {
    it('should retrieve a specific user by ID', async () => {
      const id = 1;
      const user = await userService.getUserById(id);

      expect(user).toBeDefined();
      expect(user.id).toBe(id);
    });

    it('should throw an error if id is invalid', async () => {
      const id = 'invalid' as unknown as number;

      await expect(userService.getUserById(id)).rejects.toThrowError(
        createError(400, 'Invalid user ID.')
      );
    });

    it('should throw an error if user is not found', async () => {
      const id = 999;

      await expect(userService.getUserById(id)).rejects.toThrowError(
        createError(404, 'User not found')
      );
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const id = 1;
      const email = 'updated@example.com';
      const password = 'updatedpassword';
      const username = 'updatedtestuser';
      const updatedUserData: UserUpdateInput = { email, password, username };

      const updatedUser = await userService.updateUser(id, email, password, username);

      expect(updatedUser.id).toBe(id);
      expect(updatedUser.email).toBe(email);
      expect(updatedUser.username).toBe(username);
    });

    it('should throw an error if id is invalid', async () => {
      const id = 'invalid' as unknown as number;
      const email = 'updated@example.com';
      const password = 'updatedpassword';
      const username = 'updatedtestuser';
      const updatedUserData: UserUpdateInput = { email, password, username };

      await expect(userService.updateUser(id, email, password, username)).rejects.toThrowError(
        createError(400, 'Invalid user ID.')
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      const id = 1;

      const deleteUser = jest.fn();
      prisma.user.delete = deleteUser;

      await userService.deleteUser(id);

      expect(deleteUser).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw an error if id is invalid', async () => {
      const id = 'invalid' as unknown as number;

      await expect(userService.deleteUser(id)).rejects.toThrowError(
        createError(400, 'Invalid user ID.')
      );
    });
  });
});