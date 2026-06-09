import DashboardHeader from "../components/DashboardHeader";
import SubjectCard from "../components/SubjectCard";
import TodayCard from "../components/TodayCard";
import PomodoroCard from "../components/PomodoroCard";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  return (
    <div className="min-h-screen w-full p-4 sm:p-8">
      <div className="mx-auto">
        <DashboardHeader />
        <div className="flex flex-col w-full sm:gap-8 sm:mt-8 mt-4 gap-4 items-center sm:items-start sm:flex-row sm:flex-wrap">
          <div className="flex-1 w-full sm:min-w-sm">
            <TodayCard />
          </div>
          <div className="flex-1 w-full sm:min-w-sm">
            <TaskCard />
          </div>
          <div className="flex-1 w-full sm:min-w-sm sm:max-w-sm">
            <SubjectCard />
          </div>

          <div className="flex-1 w-full sm:max-w-75">
            <PomodoroCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
