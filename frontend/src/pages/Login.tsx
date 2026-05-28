import { SignIn } from "@clerk/react";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <SignIn fallbackRedirectUrl="/dashboard" signUpUrl="/register" />
    </div>
  );
};

export default Login;
