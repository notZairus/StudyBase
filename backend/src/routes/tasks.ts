import { Request, Router, Response } from "express";
import { createTaskSchema } from "@studybase/shared";
import { z } from "zod";
import { getAuth } from "@clerk/express";
import prisma from "../prisma/client";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

router.post("/", async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(403).send({
      message: "Forbidden",
    });
  }

  const result = createTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(z.treeifyError(result.error));
  }

  const data: z.infer<typeof createTaskSchema> = result.data;

  const newTask = await prisma.task.create({
    data: {
      userId: userId,
      name: data.name,
      description: data.description,
      status: data.status,
      deadline: data.deadline as Date,
      color: data.color,
      subjects: {
        create: data.subject.map((sub) => ({
          userId: userId,
          name: sub,
        })),
      },
    },
  });

  return res.status(201).send({
    message: "created.",
    task: newTask,
  });
});

export default router;
