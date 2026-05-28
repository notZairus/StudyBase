import { SignUp } from "@clerk/react";

const Register = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <SignUp fallbackRedirectUrl="/dashboard" signInUrl="/login" />
    </div>
  );
};

export default Register;
