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

export async function post(token: string, data: TaskDTO) {
  await fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
