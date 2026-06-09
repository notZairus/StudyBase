import { useAuth } from "@clerk/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleCompleteSubtask() {
  const query = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      const res = await fetch(
        `http://localhost:3000/api/subtasks/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      query.invalidateQueries({
        queryKey: ["task", "id", data.subtask.parentId],
      });
    },
  });
}
