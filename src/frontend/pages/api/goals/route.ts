import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { method } = req;

  switch (method) {
    case 'GET':
      const goals = await prisma.goal.findMany({
        where: { userId: session.user.id },
      });
      return res.status(200).json(goals);
    case 'POST':
      const { name, target, metric } = req.body;
      const newGoal = await prisma.goal.create({
        data: {
          name,
          target,
          metric,
          userId: session.user.id,
        },
      });
      return res.status(201).json(newGoal);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}