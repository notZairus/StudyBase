import { Card, CardHeader, CardTitle } from "../components/ui/card";
import TaskCard from "../components/_TaskCard";
import SubjectCard from "../components/_SubjectCard";
import UserCard from "../components/_UserCard";
import DateTimeCard from "../components/_DateTimeCard";
import PomodoroCard from "../components/_PomodoroCard";
import NoteCard from "../components/_NoteCard";

function Dashboard() {
  return (
    <div className="w-full bg-primary/5">
      <div className="min-h-screen sm:max-w-5xl mx-auto sm:py-8 py-4 px-2 gap-4 w-full grid sm:grid-cols-3 sm:grid-rows-3">
        <div className="sm:hidden sm:row-span-1 h-full">
          <UserCard />
        </div>

        {/* DATE AND TIME */}
        <div className="sm:hidden sm:row-span-1 h-full">
          <DateTimeCard />
        </div>

        {/* TASKS */}
        <div className="sm:row-span-2 h-full ">
          <TaskCard />
        </div>

        {/* SUBJECTS */}
        <div className="sm:row-span-1 h-full">
          <SubjectCard />
        </div>

        {/* PROFILE */}
        <div className="hidden sm:block sm:row-span-1 h-full">
          <UserCard />
        </div>

        {/* DATE AND TIME */}
        <div className="hidden sm:block sm:row-span-1 h-full">
          <DateTimeCard />
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle>EMPTY FOR NOW</CardTitle>
          </CardHeader>
        </Card>

        {/* NOTES */}
        <div className="sm:col-span-2">
          <NoteCard />
        </div>

        {/* POMODORO */}
        <div className="sm:col-span-1">
          <PomodoroCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
