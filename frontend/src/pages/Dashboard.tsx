import DashboardHeader from "../components/DashboardHeader";
import TodayTask from "../components/TodayTask";
import UpcomingTasks from "../components/UpcomingTasks";

function Dashboard() {
  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-225 mx-auto">
        <DashboardHeader />
        <div className="flex flex-col w-full gap-8 mt-8 sm:flex-row ">
          <div className="flex-1">
            <TodayTask />
          </div>
          <div className="flex-1">
            <UpcomingTasks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
