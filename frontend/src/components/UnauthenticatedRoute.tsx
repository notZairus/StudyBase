import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "@clerk/react";

function UnauthenticatedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default UnauthenticatedRoute;
