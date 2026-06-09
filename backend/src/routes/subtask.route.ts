import { Router } from "express";
import { createSubTaskSchema } from "../schemas/subtask.schema";
import { getAuth } from "@clerk/express";
import z from "zod";
import { prisma } from "../../prisma/client";

const router = Router();

router.post("/", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(403).send({ message: "Forbidden" });

  const result = createSubTaskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).send({ error: z.treeifyError(result.error) });
  }

  const data = result.data;

  const subtask = await prisma.subtask.create({
    data: {
      parentId: data.parentId,
      name: data.name,
      status: data.status,
      description: data.description,
      color: data.color,
    },
  });

  return res.status(201).send({
    message: "created.",
    subtask,
  });
});

router.patch(`/:subtaskId/status`, async (req, res) => {
  console.log("halal");
  const { userId } = getAuth(req);
  if (!userId) return res.status(403).send({ message: "Forbidden" });

  const { subtaskId } = req.params;
  if (!subtaskId) return res.sendStatus(400);

  const targetSubtask = await prisma.subtask.findFirst({
    where: {
      id: subtaskId,
    },
  });

  console.log("hulul");

  if (!targetSubtask) return res.sendStatus(404);

  const updated = await prisma.subtask.update({
    where: {
      id: subtaskId,
    },
    data: {
      status: targetSubtask.status === "COMPLETED" ? "PENDING" : "COMPLETED",
    },
  });

  return res.status(200).send({
    subtask: updated,
  });
});

export default router;
