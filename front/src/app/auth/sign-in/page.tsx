'use client';
import LoginForm from '@/components/auth/login/LoginForm';
import { useAuth } from '@/context/session/sessionContext';

import { useRouter, redirect } from 'next/navigation';
import React from 'react';

type Props = {};

const LoginPage = (props: Props) => {
  const { user } = useAuth();

  if (user) redirect('/connect');
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
