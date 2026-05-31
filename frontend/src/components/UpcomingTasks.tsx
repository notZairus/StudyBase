import { Card, CardContent, CardHeading, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { type Task } from "@studybase/shared";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import TaskItem from "./TaskItem";

function UpcomingTasks({ tasks }: { tasks: Task[] }) {
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);

  return (
    <>
      <AddTaskModal
        open={showAddTaskModal}
        setShowAddTaskModal={setShowAddTaskModal}
      />

      <Card className="w-full">
        <CardTitle>Upcoming</CardTitle>
        <div className="flex items-center justify-between">
          <CardHeading className="text-xl">Upcoming Tasks</CardHeading>
          <Button size="icon-sm" onClick={() => setShowAddTaskModal(true)}>
            +
          </Button>
        </div>
        <CardContent className="flex flex-col gap-2 px-0">
          <ScrollArea className="h-80 w-full pr-3">
            <ScrollBar className="text-primary" />
            <div className="space-y-2">
              {tasks.map((task) => (
                <TaskItem task={task} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}

export default UpcomingTasks;
