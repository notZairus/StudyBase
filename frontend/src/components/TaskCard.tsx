import { Card, CardContent, CardHeading, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { type Task } from "../schemas/task.schema";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import TaskItem from "./TaskItem";
import { getUpcomingTasks } from "../lib/utils";
import { useTasks } from "../hooks/useTasks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

function TaskCard() {
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const { data: tasks } = useTasks();
  const { data: overdueTasks } = useTasks("overdue");
  const { data: completedTasks } = useTasks("completed");

  const uncompletedTasks =
    tasks?.filter((task) => task.status !== "COMPLETED") || [];
  const upcomingTasks: Task[] = getUpcomingTasks(uncompletedTasks);

  return (
    <>
      <AddTaskModal
        open={showAddTaskModal}
        setShowAddTaskModal={setShowAddTaskModal}
      />

      <Tabs defaultValue="upcoming" className="w-full">
        <Card className="w-full max-h-120 ">
          <div className="flex items-center justify-between">
            <CardTitle>Tasks</CardTitle>
            <TabsList className="mt-1 ">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-center justify-between">
            <TabsContent value="upcoming">
              <CardHeading className="text-xl">Upcoming Tasks</CardHeading>
            </TabsContent>
            <TabsContent value="overdue">
              <CardHeading className="text-xl">Overdue Tasks</CardHeading>
            </TabsContent>
            <TabsContent value="completed">
              <CardHeading className="text-xl">Completed Tasks</CardHeading>
            </TabsContent>
            <Button
              size="icon-sm"
              className="text-white"
              onClick={() => setShowAddTaskModal(true)}
            >
              +
            </Button>
          </div>
          <CardContent className="flex flex-col gap-2 px-0">
            <ScrollArea className="max-h-72 h-72 w-full">
              <ScrollBar className="text-primary" />
              <TabsContent value="upcoming">
                <div className="space-y-2">
                  {!upcomingTasks && (
                    <div className="w-full text-accent-foreground/50 text-xl h-40 flex items-center justify-center">
                      Loading...
                    </div>
                  )}

                  {upcomingTasks &&
                    upcomingTasks?.map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}

                  {upcomingTasks && upcomingTasks?.length === 0 && (
                    <div className="w-full text-accent-foreground/50 text-xl h-40 flex items-center justify-center">
                      No Upcomming Tasks
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="overdue">
                <div className="space-y-2">
                  {!overdueTasks && (
                    <div className="w-full text-accent-foreground/50 text-xl h-40 flex items-center justify-center">
                      Loading...
                    </div>
                  )}

                  {overdueTasks &&
                    overdueTasks.map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}

                  {overdueTasks && overdueTasks.length === 0 && (
                    <div className="w-full text-accent-foreground/50 text-xl h-40 flex items-center justify-center">
                      No Overdue Tasks
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="completed">
                <div className="space-y-2">
                  {!completedTasks && (
                    <div className="w-full text-accent-foreground/50 text-xl h-40 flex items-center justify-center">
                      Loading...
                    </div>
                  )}

                  {completedTasks &&
                    completedTasks.map((task) => (
                      <TaskItem key={task.id} task={task} />
                    ))}

                  {completedTasks && completedTasks.length === 0 && (
                    <div className="w-full text-accent-foreground/50 text-xl h-40 flex items-center justify-center">
                      No Completed Tasks
                    </div>
                  )}
                </div>
              </TabsContent>
            </ScrollArea>
          </CardContent>
        </Card>
      </Tabs>
    </>
  );
}

export default TaskCard;
