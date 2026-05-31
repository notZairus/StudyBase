import DashboardHeader from "../components/DashboardHeader";
import UpcomingTasks from "../components/UpcomingTasks";
import { Card, CardTitle } from "../components/ui/card";
import { getUpcomingTasks } from "./dashboard-utils.ts";
import { type Task } from "@studybase/shared";
import { useTasks } from "../hooks/useGetTasks.ts";

function Dashboard() {
  const { data: tasks } = useTasks();

  if (!tasks) {
    return <div>Loading...</div>;
  }

  const upcomingTasks: Task[] = getUpcomingTasks(tasks);

  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-225 mx-auto">
        <DashboardHeader />
        <div className="flex flex-col w-full gap-8 mt-8 sm:flex-row ">
          <Card className="flex-1 bg-primary">
            <CardTitle>Today</CardTitle>
          </Card>
          <div className="flex-1">
            <UpcomingTasks tasks={upcomingTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
