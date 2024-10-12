import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const goal = await prisma.goal.findUnique({
          where: { id: parseInt(id as string) },
        });

        if (!goal) {
          return res.status(404).json({ message: "Goal not found" });
        }

        return res.status(200).json(goal);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch goal" });
      }
    case "PUT":
      try {
        const { name, target, metric } = req.body;
        const updatedGoal = await prisma.goal.update({
          where: { id: parseInt(id as string) },
          data: {
            name,
            target,
            metric,
          },
        });

        return res.status(200).json(updatedGoal);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update goal" });
      }
    case "DELETE":
      try {
        const deletedGoal = await prisma.goal.delete({
          where: { id: parseInt(id as string) },
        });

        return res.status(200).json(deletedGoal);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to delete goal" });
      }
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}