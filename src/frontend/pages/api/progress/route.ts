import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const progresses = await prisma.progress.findMany({
          where: { userId: session.user.id, goalId: parseInt(req.query.goalId as string) },
          orderBy: { date: 'desc' },
        });
        return res.status(200).json(progresses);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch progress' });
      }
    case 'POST':
      try {
        const { value, description } = req.body;
        const newProgress = await prisma.progress.create({
          data: {
            value,
            description,
            goal: { connect: { id: parseInt(req.query.goalId as string) } },
            user: { connect: { id: session.user.id } },
          },
        });
        return res.status(201).json(newProgress);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create progress' });
      }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}