import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import app from '../../app';
import { User } from '../../models/User';
import { UserCreateInput, UserLoginInput } from '../../models/User';

const prisma = new PrismaClient();

describe('Auth Routes', () => {
  let user: User;

  beforeAll(async () => {
    // Create a user for testing purposes
    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user account', async () => {
      const userData: UserCreateInput = {
        email: 'newuser@example.com',
        password: 'securepass456',
        username: 'newtestuser',
      };
      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData);
      expect(response.status).toBe(201);
      expect(response.body.email).toBe('newuser@example.com');
      expect(response.body.username).toBe('newtestuser');
    });

    it('should return an error if user already exists', async () => {
      const userData: UserCreateInput = {
        email: 'test@example.com', // Existing email
        password: 'securepass456',
        username: 'newtestuser2',
      };
      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData);
      expect(response.status).toBe(409);
      expect(response.body.message).toBe('User already exists.');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should authenticate an existing user', async () => {
      const loginData: UserLoginInput = {
        email: 'test@example.com',
        password: 'password123',
      };
      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it('should return an error for invalid credentials', async () => {
      const loginData: UserLoginInput = {
        email: 'test@example.com',
        password: 'wrongpassword', // Invalid password
      };
      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials.');
    });

    it('should return an error for non-existent user', async () => {
      const loginData: UserLoginInput = {
        email: 'nonexistent@example.com', // Non-existent email
        password: 'password123',
      };
      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials.');
    });
  });
});