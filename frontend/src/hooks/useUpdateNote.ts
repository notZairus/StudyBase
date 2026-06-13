import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import type { Note, NoteDTO } from "../schemas/note.schema";

export function useUpdateNote() {
  const { getToken } = useAuth();
  const query = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<NoteDTO>;
    }) => {
      const token = await getToken();

      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      return resData.note;
    },
    onSuccess: (data: Note) => {
      console.log("running po?");

      console.log(data);

      query.invalidateQueries({
        queryKey: ["notes"],
      });

      data.subjects.forEach((s) => {
        query.invalidateQueries({
          queryKey: ["subject", "id", s.id],
        });
      });

      query.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
  });
}
