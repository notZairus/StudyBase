import type { Task } from "@studybase/shared";

const statusStyles = {
  IN_PROGRESS: "bg-amber-100 text-amber-900 ring-amber-200",
  PENDING: "bg-slate-100 text-slate-700 ring-slate-200",
  COMPLETED: "bg-emerald-100 text-emerald-900 ring-emerald-200",
};

const taskColorStyles = {
  red: "bg-red-700",
  yellow: "bg-yellow-400",
  green: "bg-green-400",
};

const deadlineFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const TaskItem = ({ task }: { task: Task }) => {
  return (
    <div
      key={task.id}
      className="rounded-lg border border-border bg-background/80 px-3 py-2"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`shrink-0 aspect-square w-1.5 rounded-full ${taskColorStyles[task.color]}`}
          />
          <h3 className="text-sm font-medium text-foreground truncate">
            {task.name}
          </h3>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${statusStyles[task.status]}`}
        >
          {task.status}
        </span>
      </div>

      <div className="mb-2 pl-3.5">
        <p className="text-xs text-muted-foreground truncate">
          {task.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-1 gap-2 pl-3.5">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
          {task.subjects.map((sub) => sub.name).join(", ")}
        </span>
        <span className="shrink-0 text-[10px] uppercase tracking-widest text-muted-foreground/70">
          {deadlineFormatter.format(new Date(task.deadline as string))}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
