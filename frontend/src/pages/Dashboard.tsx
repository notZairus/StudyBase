import DashboardHeader from "../components/DashboardHeader";
import { Card, CardTitle } from "../components/ui/card";

const taskList = [
  {
    name: "Task 1",
    description: "This is the first task",
    status: "In Progress",
  },
  {
    name: "Task 2",
    description: "This is the second task",
    status: "Completed",
  },
  {
    name: "Task 3",
    description: "This is the third task",
    status: "Not Started",
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen w-full p-8">
      <div className="max-w-225 mx-auto">
        <DashboardHeader />
        <div className="flex flex-col w-full gap-8 mt-8 sm:flex-row ">
          <Card className="flex-1 bg-primary">
            <CardTitle>Today</CardTitle>
          </Card>
          <Card className="flex-1 bg-secondary">
            <CardTitle>Upcomming</CardTitle>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
