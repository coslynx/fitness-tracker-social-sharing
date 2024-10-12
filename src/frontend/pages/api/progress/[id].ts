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

  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const progress = await prisma.progress.findUnique({
          where: { id: parseInt(id as string) },
        });

        if (!progress) {
          return res.status(404).json({ message: 'Progress not found' });
        }

        return res.status(200).json(progress);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch progress' });
      }
    case 'PUT':
      try {
        const { value, description } = req.body;
        const updatedProgress = await prisma.progress.update({
          where: { id: parseInt(id as string) },
          data: {
            value,
            description,
          },
        });

        return res.status(200).json(updatedProgress);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update progress' });
      }
    case 'DELETE':
      try {
        const deletedProgress = await prisma.progress.delete({
          where: { id: parseInt(id as string) },
        });

        return res.status(200).json(deletedProgress);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: 'Failed to delete progress' });
      }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}