'use client';
import RegisterForm from '@/components/auth/register/RegisterForm';
import { useAuth } from '@/context/session/sessionContext';

import { redirect } from 'next/navigation';
import React from 'react';

type Props = {};

const RegisterPage = (props: Props) => {
  const { user } = useAuth();
  if (user) redirect('/connect');
  return (
    <>
      <div className="container my-10 py-3  min-h-screen  w-full mx-auto">
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
