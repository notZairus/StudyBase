import { Router } from "express";
import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { prisma } from "../../prisma/client";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) res.status(403).send({ message: "Forbidden" });

  const subjects = await prisma.subject.findMany({
    where: {
      userId: userId as string,
    },
    include: {
      tasks: true,
    },
  });

  return res.status(200).send({ subjects });
});

router.delete("/:subjectId", async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) res.status(403).send({ message: "Forbidden" });

  const { subjectId } = req.params;

  await prisma.subject.delete({
    where: {
      id: subjectId as string,
    },
  });

  await prisma.task.deleteMany({
    where: {
      userId: userId as string,
      subjects: {
        none: {},
      },
    },
  });

  return res.status(200).send({ message: "successful" });
});

export default router;
