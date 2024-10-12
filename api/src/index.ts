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

  switch (req.url) {
    case "/goals":
      return handleGoals(req, res);
    case "/progress":
      return handleProgress(req, res);
    default:
      return res.status(404).json({ message: "Not Found" });
  }
}

async function handleGoals(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const goals = await prisma.goal.findMany({
          where: { userId: session.user.id },
        });

        return res.status(200).json(goals);
      } catch (error) {
        console.error("Error fetching goals:", error);
        return res.status(500).json({ message: "Failed to fetch goals" });
      }
    case "POST":
      try {
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
      } catch (error) {
        console.error("Error creating goal:", error);
        return res.status(500).json({ message: "Failed to create goal" });
      }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleProgress(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const goalId = parseInt(req.query.goalId as string);
        const progresses = await prisma.progress.findMany({
          where: { userId: session.user.id, goalId },
          orderBy: { date: "desc" },
        });

        return res.status(200).json(progresses);
      } catch (error) {
        console.error("Error fetching progress:", error);
        return res.status(500).json({ message: "Failed to fetch progress" });
      }
    case "POST":
      try {
        const { value, description } = req.body;
        const goalId = parseInt(req.query.goalId as string);

        const newProgress = await prisma.progress.create({
          data: {
            value,
            description,
            goal: { connect: { id: goalId } },
            user: { connect: { id: session.user.id } },
          },
        });

        return res.status(201).json(newProgress);
      } catch (error) {
        console.error("Error creating progress:", error);
        return res.status(500).json({ message: "Failed to create progress" });
      }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}