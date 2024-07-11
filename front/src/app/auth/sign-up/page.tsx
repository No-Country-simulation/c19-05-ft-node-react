import RegisterForm from "@/components/auth/register/RegisterForm";
import React from "react";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <>
      <div className="container my-10 py-3  min-h-screen  w-full mx-auto">
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
