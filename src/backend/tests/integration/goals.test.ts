import { PrismaClient } from '@prisma/client';
import { createError } from '../../utils/error';
import request from 'supertest';
import app from '../../app';
import { Goal } from '../../models/Goal';
import { GoalCreateInput, GoalUpdateInput } from '../../models/Goal';

const prisma = new PrismaClient();

describe('Goal Routes', () => {
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

  describe('POST /api/goals', () => {
    it('should create a new goal', async () => {
      const goalData: GoalCreateInput = {
        userId: user.id,
        name: 'New Test Goal',
        target: '15',
        metric: 'miles',
      };
      const response = await request(app)
        .post('/api/goals')
        .set('Authorization', `Bearer ${user.token}`)
        .send(goalData);
      expect(response.status).toBe(201);
      expect(response.body.userId).toBe(user.id);
      expect(response.body.name).toBe('New Test Goal');
      expect(response.body.target).toBe('15');
      expect(response.body.metric).toBe('miles');
    });
  });

  describe('GET /api/goals', () => {
    it('should get all goals for the user', async () => {
      const response = await request(app)
        .get('/api/goals')
        .set('Authorization', `Bearer ${user.token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /api/goals/:id', () => {
    it('should get a specific goal by ID', async () => {
      const response = await request(app)
        .get(`/api/goals/${goal.id}`)
        .set('Authorization', `Bearer ${user.token}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(goal.id);
      expect(response.body.name).toBe('Test Goal');
    });

    it('should return an error if goal not found', async () => {
      const response = await request(app)
        .get('/api/goals/999') // Invalid goal ID
        .set('Authorization', `Bearer ${user.token}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Goal not found');
    });
  });

  describe('PUT /api/goals/:id', () => {
    it('should update an existing goal', async () => {
      const updatedGoalData: GoalUpdateInput = {
        name: 'Updated Test Goal',
        target: '20',
        metric: 'km',
      };
      const response = await request(app)
        .put(`/api/goals/${goal.id}`)
        .set('Authorization', `Bearer ${user.token}`)
        .send(updatedGoalData);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(goal.id);
      expect(response.body.name).toBe('Updated Test Goal');
      expect(response.body.target).toBe('20');
      expect(response.body.metric).toBe('km');
    });

    it('should return an error if goal not found', async () => {
      const updatedGoalData: GoalUpdateInput = {
        name: 'Updated Test Goal',
        target: '20',
        metric: 'km',
      };
      const response = await request(app)
        .put('/api/goals/999') // Invalid goal ID
        .set('Authorization', `Bearer ${user.token}`)
        .send(updatedGoalData);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Goal not found');
    });
  });

  describe('DELETE /api/goals/:id', () => {
    it('should delete an existing goal', async () => {
      const response = await request(app)
        .delete(`/api/goals/${goal.id}`)
        .set('Authorization', `Bearer ${user.token}`);
      expect(response.status).toBe(204);
    });

    it('should return an error if goal not found', async () => {
      const response = await request(app)
        .delete('/api/goals/999') // Invalid goal ID
        .set('Authorization', `Bearer ${user.token}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Goal not found');
    });
  });
});