import { PrismaClient } from '@prisma/client';
import { createError } from '../utils/error';

const prisma = new PrismaClient();

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  goals: Goal[];
}

export interface UserCreateInput {
  email: string;
  password: string;
  username: string;
}

export interface UserUpdateInput {
  email?: string;
  password?: string;
  username?: string;
}

export class UserService {
  /**
   * @description Creates a new user account.
   * @param email The user's email address.
   * @param password The user's password.
   * @param username The user's username.
   * @returns The newly created user.
   */
  async createUser(email: string, password: string, username: string): Promise<User> {
    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          password,
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
   * @description Retrieves a specific user by ID.
   * @param id The ID of the user to retrieve.
   * @returns The user with the specified ID.
   */
  async getUserById(id: number): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          goals: true,
        },
      });
      if (!user) {
        throw createError(404, 'User not found');
      }
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to fetch user.');
    }
  }

  /**
   * @description Updates an existing user account.
   * @param id The ID of the user to update.
   * @param email The new email address for the user (optional).
   * @param password The new password for the user (optional).
   * @param username The new username for the user (optional).
   * @returns The updated user.
   */
  async updateUser(id: number, email?: string, password?: string, username?: string): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { email, password, username },
      });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to update user.');
    }
  }

  /**
   * @description Deletes an existing user account.
   * @param id The ID of the user to delete.
   */
  async deleteUser(id: number): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error instanceof Error) {
        throw createError(400, error.message);
      }
      throw createError(500, 'Failed to delete user.');
    }
  }
}