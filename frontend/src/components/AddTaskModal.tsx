import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { type TaskDTO, createTaskSchema } from "@studybase/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "../hooks/useCreateTask";

function AddTaskModal({
  open,
  setShowAddTaskModal,
}: {
  open: boolean;
  setShowAddTaskModal: (open: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<TaskDTO>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "PENDING",
      subjects: [],
      color: "red",
      deadline: undefined,
    },
  });
  const createTask = useCreateTask();
  const [subs, setSubs] = useState<string[]>([]);
  const [subjectInput, setSubjectInput] = useState("");

  const handleAddSubject = () => {
    const value = subjectInput.trim();
    if (!value) return;
    setValue("subjects", [...getValues("subjects"), value]);
    setSubs([...subs, value]);
    setSubjectInput("");
  };

  const removeSubject = (index: number) => {
    setValue(
      "subjects",
      getValues("subjects").filter((_, i) => i !== index),
    );
    setSubs(subs.filter((_, i) => i !== index));
  };

  const onSubmit = (data: TaskDTO) => {
    createTask.mutate(data);
    setShowAddTaskModal(false);
  };

  return (
    <Dialog open={open} onOpenChange={setShowAddTaskModal}>
      <DialogContent className="sm:max-w-lg flex flex-col max-h-[90vh]">
        <DialogHeader className="shrink-0">
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 pr-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 pb-2 pl-1"
          >
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Task Name</Label>
              <Input
                id="name"
                placeholder="Enter task name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the task..."
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Subject tags */}
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                placeholder="Type subject and press Enter..."
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSubject();
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {subs.map((subject, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs"
                  >
                    <span>{subject}</span>
                    <button
                      type="button"
                      onClick={() => {
                        console.log("Removing subject at index:", index);
                        removeSubject(index);
                      }}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              {errors.subjects && (
                <p className="text-sm text-red-500">
                  {errors.subjects.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) =>
                  setValue("status", value as TaskDTO["status"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="datetime-local"
                value={getValues("deadline")}
                onChange={(e) => setValue("deadline", e.target.value)}
              />
              {errors.deadline && (
                <p className="text-sm text-red-500">
                  {errors.deadline.message}
                </p>
              )}
            </div>

            {/* Color */}
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={watch("color")}
                onValueChange={(value) =>
                  setValue("color", value as TaskDTO["color"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="red">🔴 High </SelectItem>
                  <SelectItem value="green">🟢 Medium</SelectItem>
                  <SelectItem value="yellow">🟡 Low</SelectItem>
                </SelectContent>
              </Select>
              {errors.color && (
                <p className="text-sm text-red-500">{errors.color.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddTaskModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createTask.isPending}>
                {createTask.isPending ? "Creating Task..." : "Create Task"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;
