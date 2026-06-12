import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().trim().min(3),
  subjects: z.array(z.string()).min(1),
  content: z.string().optional(),
});

export type NoteDTO = z.infer<typeof createNoteSchema>;
