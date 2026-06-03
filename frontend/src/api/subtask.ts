import type { SubtaskDTO } from "@studybase/shared";

export async function createSubtask(token: string, subtask: SubtaskDTO) {
  const res = await fetch("http://localhost:3000/api/subtasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subtask),
  });

  const data = await res.json();
  return data.subtask;
}
