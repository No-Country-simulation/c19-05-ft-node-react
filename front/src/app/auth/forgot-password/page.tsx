import ForgotPassword from "@/components/auth/forgot-password/ForgotPassword";
import { useAuth } from "@/context/session/sessionContext";
import React from "react";

type Props = {};

const ForgotPasswordPage = (props: Props) => {
  
  return (
    <>
      <ForgotPassword />
    </>
  );
};

export default ForgotPasswordPage;
