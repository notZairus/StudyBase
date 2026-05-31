import type { TaskDTO } from "@studybase/shared";

export async function get(token: string) {
  const res = await fetch("http://localhost:3000/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.tasks;
}

export async function createTask(token: string, data: TaskDTO) {
  await fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function toggleCompleteTask(token: string, id: string) {
  await fetch(`http://localhost:3000/api/tasks/status/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
