import { type Task } from "@studybase/shared";

const MS_IN_DAY = 24 * 60 * 60 * 1000;

export function getUpcomingTasks(tasks: Task[], now = new Date()) {
  const cutoff = new Date(now.getTime() + 7 * MS_IN_DAY);

  return tasks
    .filter((task): task is Task & { deadline: string } => {
      if (!task.deadline) return false;
      const taskDeadline = new Date(task.deadline);
      return (
        taskDeadline.getDate() !== now.getDate() &&
        taskDeadline >= now &&
        taskDeadline <= cutoff
      );
    })
    .sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    );
}
