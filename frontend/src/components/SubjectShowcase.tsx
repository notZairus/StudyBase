import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Trash2,
  // Fingerprint,
  // User,
  CheckCircle2,
  Circle,
  ListTodo,
} from "lucide-react";
import { type Subject, type subjectDTO } from "../schemas/subject.schema";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import type { Task } from "../schemas/task.schema";
// import { useDebouncedCallback } from "use-debounce";
import { useToggleCompleteTask } from "../hooks/useToggleComplete";
// Assuming these hooks exist based on your project's architecture
// import { useUpdateSubject } from "../hooks/useUpdateSubject";
import { useDeleteSubject } from "../hooks/useDeleteSubject";

const colorConfig: Record<
  Task["color"],
  { dot: string; badge: string; text: string; label: string }
> = {
  red: {
    dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]",
    badge:
      "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50",
    text: "text-rose-600 dark:text-rose-400",
    label: "High Priority",
  },
  yellow: {
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    badge:
      "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
    text: "text-amber-600 dark:text-amber-400",
    label: "Medium Priority",
  },
  green: {
    dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Low Priority",
  },
};

interface SubjectShowcaseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  subject: Subject;
}

const SubjectShowcase = ({
  open = false,
  setOpen,
  subject: subjectProp,
}: SubjectShowcaseProps) => {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const toggleComplete = useToggleCompleteTask();

  useEffect(() => {
    function syncSubject() {
      setSubject(subjectProp);
    }

    syncSubject();
  }, [subjectProp]);

  // const updateSubject = useUpdateSubject();
  const deleteSubject = useDeleteSubject();

  // const debouncedHandleUpdate = useDebouncedCallback(
  //   (subjectId: string, updatedFields: Partial<subjectDTO>) => {
  //     updateSubject.mutate({
  //       id: subjectId,
  //       data: updatedFields,
  //     });
  //   },
  //   500,
  // );

  if (!subject) {
    return (
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  const handleDeleteSubject = () => {
    deleteSubject.mutate(subject.id);
    setOpenConfirmDelete(false);
    setOpen(false);
  };

  const emitUpdate = (fields: Partial<subjectDTO>) => {
    console.log(fields);
    // debouncedHandleUpdate(subject.id, fields);
  };

  console.log(subject);

  const handleToggleCompleteTask = (taskId: string) => () => {
    setSubject({
      ...subject,
      tasks: subject?.tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: t.status === "COMPLETED" ? "PENDING" : "COMPLETED",
            }
          : t,
      ),
    });

    toggleComplete.mutate(taskId);
  };

  return (
    <>
      {/* Confirmation Dialog for Deletion */}
      <Dialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
        <DialogContent className="sm:max-w-md p-6 rounded-2xl border bg-background shadow-xl">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Delete Subject
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              "{subject.name}"
            </span>
            ? This action cannot be undone and might affect tasks associated
            with this subject.
          </DialogDescription>
          <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenConfirmDelete(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSubject}
              className="rounded-xl"
            >
              Delete Subject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Showcase Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-xl p-0 overflow-hidden gap-0 rounded-2xl border bg-background shadow-xl animate-in fade-in-50 duration-200"
          showCloseButton={false}
        >
          <div className="p-6 space-y-6">
            {/* Main Header - Editable Input & Trash Action */}
            <div className="flex items-center gap-3.5 justify-between">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="flex-1">
                  <DialogTitle className="sr-only">{subject.name}</DialogTitle>
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => emitUpdate({ name: e.target.value })}
                    placeholder="Subject name..."
                    className="w-full bg-transparent border-0 p-0 text-xl font-semibold tracking-tight leading-snug focus:outline-none focus:ring-0 placeholder:text-muted-foreground/40 transition-colors text-foreground"
                  />
                </div>
              </div>

              {/* Actionable Delete Button */}
              <button
                onClick={() => setOpenConfirmDelete(true)}
                className="p-1.5 my-1 rounded-lg text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 transition-all focus:outline-none active:scale-95 shrink-0"
                title="Delete subject"
              >
                <Trash2 className="size-4.5" />
              </button>
            </div>

            {/* Tasks Section (Mirrors Subtasks Layout) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListTodo className="size-3.5 text-muted-foreground/80" />
                  <h4 className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                    Associated Tasks
                  </h4>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground/90 border border-border/40">
                    {
                      subject.tasks.filter(
                        (t: Task) => t.status === "COMPLETED",
                      ).length
                    }{" "}
                    of {subject.tasks.length} completed
                  </span>
                </div>
              </div>

              <div>
                <ScrollArea className="h-44 rounded-xl border border-border/50 bg-card/30">
                  <ScrollBar />
                  <div className="divide-y divide-border/30 overflow-hidden">
                    {subject.tasks &&
                      subject.tasks.map((task: Task) => {
                        const taskConfig = colorConfig[task.color];
                        const taskCompleted = task.status === "COMPLETED";

                        return (
                          <div
                            key={task.id}
                            // onClick={() => onTaskClick?.(task)}
                            className={`flex items-center justify-between p-3 gap-3 hover:bg-muted/20 transition-colors group/row cursor-pointer`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <div
                                className="shrink-0 focus:outline-none"
                                onClick={handleToggleCompleteTask(task.id)}
                              >
                                {taskCompleted ? (
                                  <CheckCircle2 className="size-4 text-emerald-500 fill-emerald-50 dark:fill-emerald-950/20" />
                                ) : (
                                  <Circle className="size-4 text-muted-foreground/40 group-hover/row:text-muted-foreground/70" />
                                )}
                              </div>

                              <span
                                className={`text-sm tracking-tight truncate transition-colors ${
                                  taskCompleted
                                    ? "line-through text-muted-foreground/50"
                                    : "text-foreground/90"
                                }`}
                              >
                                {task.name}
                              </span>
                            </div>

                            {/* Priority Indicator */}
                            <div className="flex items-center gap-2 shrink-0 pl-1">
                              <span
                                className={`size-1.5 rounded-full ${taskConfig.dot}`}
                                title={taskConfig.label}
                              />
                            </div>
                          </div>
                        );
                      })}
                    {subject.tasks?.length === 0 && (
                      <div className="p-4 w-full text-center text-muted-foreground/70 italic text-sm">
                        No tasks assigned to this subject yet.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubjectShowcase;
