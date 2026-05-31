import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { CalendarDays, CheckCircle2, Circle, Tag } from "lucide-react";
import { type Task } from "@studybase/shared";
import { useToggleCompleteTask } from "../hooks/useToggleComplete";

const colorConfig: Record<
  Task["color"],
  { stripe: string; badge: string; label: string }
> = {
  red: {
    stripe: "bg-red-500",
    badge: "bg-red-100 text-red-700 border-red-200",
    label: "Red",
  },
  yellow: {
    stripe: "bg-yellow-400",
    badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
    label: "Yellow",
  },
  green: {
    stripe: "bg-green-500",
    badge: "bg-green-100 text-green-700 border-green-200",
    label: "Green",
  },
};

function formatDeadline(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const TaskShowcase = ({
  open = false,
  setOpen,
  task,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  task: Task;
}) => {
  const color = colorConfig[task.color];
  const isCompleted = task.status === "COMPLETED";
  const deadline = formatDeadline(task.deadline);
  const toggleComplete = useToggleCompleteTask();

  const handleToggleComplete = () => {
    toggleComplete.mutate(task.id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="p-0 overflow-hidden sm:max-w-xl gap-0 rounded-xl"
        showCloseButton={false}
      >
        {/* Colour stripe */}
        <div className={`h-1.5 w-full ${color.stripe}`} />

        <div className="px-6 pt-5 pb-6 space-y-5">
          {/* Header */}
          <DialogHeader className="space-y-1">
            <div className="flex items-start justify-between gap-3">
              <DialogTitle className="text-lg font-semibold leading-snug">
                {task.name}
              </DialogTitle>

              {/* Status badge */}
              {isCompleted ? (
                <Badge
                  variant="outline"
                  className="shrink-0 gap-1.5 text-green-700 border-green-300 bg-green-50 cursor-pointer"
                  onClick={handleToggleComplete}
                >
                  <CheckCircle2 className="size-3.5" />
                  Completed
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="shrink-0 gap-1.5 text-orange-600 border-orange-300 bg-orange-50 cursor-pointer"
                  onClick={handleToggleComplete}
                >
                  <Circle className="size-3.5" />
                  Pending
                </Badge>
              )}
            </div>

            {/* ID */}
            <p className="text-xs text-muted-foreground">Task #{task.id}</p>
          </DialogHeader>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {task.description}
            </p>
          )}

          <Separator />

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {/* Colour */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Priority
              </p>
              <Badge
                variant="outline"
                className={`w-fit gap-1.5 font-normal ${color.badge}`}
              >
                <span
                  className={`inline-block size-2 rounded-full ${color.stripe}`}
                />
                {color.label}
              </Badge>
            </div>

            {/* Deadline */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Deadline
              </p>
              {deadline ? (
                <div className="flex items-center gap-1.5 text-sm">
                  <CalendarDays className="size-3.5 text-muted-foreground" />
                  <span>{deadline}</span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  No deadline
                </span>
              )}
            </div>
          </div>

          {/* Subjects */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Tag className="size-3.5" />
              Subjects
            </p>
            <div className="flex flex-wrap gap-2">
              {task.subjects.map((s) => (
                <Badge key={s.id} variant="secondary" className="font-normal">
                  {s.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskShowcase;
