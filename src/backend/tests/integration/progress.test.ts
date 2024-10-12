import { PrismaClient } from '@prisma/client';
import { createError } from '../../utils/error';
import request from 'supertest';
import app from '../../app';
import { Goal } from '../../models/Goal';
import { Progress } from '../../models/Progress';
import { GoalCreateInput, GoalUpdateInput } from '../../models/Goal';
import { ProgressCreateInput, ProgressUpdateInput } from '../../models/Progress';

const prisma = new PrismaClient();

describe('Progress Routes', () => {
  let user: any;
  let goal: Goal;

  beforeAll(async () => {
    // Create a user for testing purposes
    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
      },
    });
    // Create a goal for the user
    goal = await prisma.goal.create({
      data: {
        userId: user.id,
        name: 'Test Goal',
        target: '10',
        metric: 'kg',
        progress: 'in progress',
      },
    });
  });

  afterAll(async () => {
    await prisma.goal.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /api/progress', () => {
    it('should create a new progress entry', async () => {
      const progressData: ProgressCreateInput = {
        goalId: goal.id,
        value: '5',
        description: 'Made progress today!',
      };
      const response = await request(app)
        .post('/api/progress')
        .set('Authorization', `Bearer ${user.token}`)
        .send(progressData);
      expect(response.status).toBe(201);
      expect(response.body.goalId).toBe(goal.id);
      expect(response.body.value).toBe('5');
      expect(response.body.description).toBe('Made progress today!');
    });

    it('should return an error if goalId is invalid', async () => {
      const progressData: ProgressCreateInput = {
        goalId: 999, // Invalid goal ID
        value: '5',
        description: 'Made progress today!',
      };
      const response = await request(app)
        .post('/api/progress')
        .set('Authorization', `Bearer ${user.token}`)
        .send(progressData);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid goal ID.');
    });

    it('should return an error if value is invalid', async () => {
      const progressData: ProgressCreateInput = {
        goalId: goal.id,
        value: 'invalid', // Invalid value
        description: 'Made progress today!',
      };
      const response = await request(app)
        .post('/api/progress')
        .set('Authorization', `Bearer ${user.token}`)
        .send(progressData);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid progress value.');
    });

    it('should return an error if description is too long', async () => {
      const progressData: ProgressCreateInput = {
        goalId: goal.id,
        value: '5',
        description: 'This description is way too long and exceeds the maximum allowed length of 250 characters. It is longer than 250 characters.', // Exceeds 250 characters
      };
      const response = await request(app)
        .post('/api/progress')
        .set('Authorization', `Bearer ${user.token}`)
        .send(progressData);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Description is too long.');
    });
  });

  describe('GET /api/progress/:goalId', () => {
    it('should get all progress entries for a goal', async () => {
      const response = await request(app)
        .get(`/api/progress/${goal.id}`)
        .set('Authorization', `Bearer ${user.token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(0); // Expect at least zero progress entries
    });

    it('should return an error if goalId is invalid', async () => {
      const response = await request(app)
        .get('/api/progress/999')
        .set('Authorization', `Bearer ${user.token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid goal ID.');
    });
  });

  describe('PUT /api/progress/:id', () => {
    let progress: Progress;
    beforeEach(async () => {
      progress = await prisma.progress.create({
        data: {
          goalId: goal.id,
          value: '3',
          userId: user.id,
          date: new Date(),
        },
      });
    });

    it('should update an existing progress entry', async () => {
      const updatedProgressData: ProgressUpdateInput = {
        value: '7',
        description: 'Updated progress!',
      };
      const response = await request(app)
        .put(`/api/progress/${progress.id}`)
        .set('Authorization', `Bearer ${user.token}`)
        .send(updatedProgressData);
      expect(response.status).toBe(200);
      expect(response.body.value).toBe('7');
      expect(response.body.description).toBe('Updated progress!');
    });

    it('should return an error if id is invalid', async () => {
      const updatedProgressData: ProgressUpdateInput = {
        value: '7',
        description: 'Updated progress!',
      };
      const response = await request(app)
        .put('/api/progress/999')
        .set('Authorization', `Bearer ${user.token}`)
        .send(updatedProgressData);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid progress ID.');
    });

    it('should return an error if value is invalid', async () => {
      const updatedProgressData: ProgressUpdateInput = {
        value: 'invalid', // Invalid value
        description: 'Updated progress!',
      };
      const response = await request(app)
        .put(`/api/progress/${progress.id}`)
        .set('Authorization', `Bearer ${user.token}`)
        .send(updatedProgressData);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid progress value.');
    });

    it('should return an error if description is too long', async () => {
      const updatedProgressData: ProgressUpdateInput = {
        value: '7',
        description: 'This description is way too long and exceeds the maximum allowed length of 250 characters. It is longer than 250 characters.', // Exceeds 250 characters
      };
      const response = await request(app)
        .put(`/api/progress/${progress.id}`)
        .set('Authorization', `Bearer ${user.token}`)
        .send(updatedProgressData);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Description is too long.');
    });
  });

  describe('DELETE /api/progress/:id', () => {
    let progress: Progress;
    beforeEach(async () => {
      progress = await prisma.progress.create({
        data: {
          goalId: goal.id,
          value: '3',
          userId: user.id,
          date: new Date(),
        },
      });
    });

    it('should delete an existing progress entry', async () => {
      const response = await request(app)
        .delete(`/api/progress/${progress.id}`)
        .set('Authorization', `Bearer ${user.token}`);
      expect(response.status).toBe(204);
    });

    it('should return an error if id is invalid', async () => {
      const response = await request(app)
        .delete('/api/progress/999')
        .set('Authorization', `Bearer ${user.token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid progress ID.');
    });
  });
});