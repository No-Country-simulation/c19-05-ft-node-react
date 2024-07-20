
import ResetPassword from "@/components/auth/reset-password/ResetPassword";
import { useAuth } from "@/context/session/sessionContext";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

type Props = {};

const ResetPasswordPage = (props: Props) => {
  
  return (
    <>
      <ResetPassword/>
    </>
  );
};

export default ResetPasswordPage;