import { UserButton, Show } from "@clerk/react";

const Dashboard = () => {
  return (
    <>
      <Show when="signed-in">
        <UserButton />
      </Show>
      <div>hello from dashboard</div>
    </>
  );
};

export default Dashboard;
