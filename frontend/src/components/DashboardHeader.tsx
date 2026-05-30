import { Card, CardHeading, CardSubHeading, CardTitle } from "./ui/card";
import { UserButton } from "@clerk/react";

const DashboardHeader = () => {
  return (
    <>
      <Card>
        <CardTitle>Dashboard</CardTitle>
        <div className="flex gap-10 items-start justify-between">
          <div className="flex flex-col gap-4 max-w-3xl">
            <CardHeading>Your Study Rhytm, All in One Place</CardHeading>
            <CardSubHeading>
              Track your sessions, stay focused, and keep every study goal in
              one simple dashboard.
            </CardSubHeading>
          </div>
          <div>
            <div className="scale-150 p-1 flex items-center justify-center rounded-full bg-primary/50">
              <UserButton />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default DashboardHeader;
