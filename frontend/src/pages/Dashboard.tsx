import DashboardHeader from "../components/DashboardHeader";
import OverdueTasks from "../components/OverdueTasks";
import Subjects from "../components/Subjects";
import TodayTask from "../components/TodayTask";
import {
  Card,
  CardContent,
  CardHeading,
  CardTitle,
} from "../components/ui/card";
import UpcomingTasks from "../components/UpcomingTasks";

function Dashboard() {
  return (
    <div className="min-h-screen w-full p-8">
      <div className="mx-auto">
        <DashboardHeader />
        <div className="flex flex-col w-full gap-8 mt-8 items-center sm:items-start sm:flex-row sm:flex-wrap">
          <div className="flex-1 w-full min-w-xs">
            <TodayTask />
          </div>
          <div className="flex-1 w-full min-w-xs">
            <UpcomingTasks />
          </div>
          <div className="flex-1 w-full min-w-xs">
            <OverdueTasks />
          </div>
          <div className="flex-1 sm:max-w-xs w-full">
            <Subjects />
          </div>

          <div className="flex-1 w-full sm:max-w-xs">
            <Card className="w-full bg-primary shadow-lg text-white max-h-108">
              <CardTitle>Pomodoro</CardTitle>
              <div className="flex items-center justify-between">
                <CardHeading className="text-xl">Pomodoro Timer</CardHeading>
              </div>
              <CardContent className="flex flex-col gap-2 px-0"></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
