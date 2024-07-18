'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@/context/session/sessionContext';
import { Toaster, toast } from 'sonner'
import { Respuesta } from '@/types/user.type';
interface FormValues {
  email: string;
  password: string;
}


const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { isLoading, login, user } = useAuth();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const promise = async (): Promise <Respuesta>=> {
      const response = await login(data);
      if (response.status !== "success") {
        throw new Error('Registration failed');
      }
      return response;
    };
  
    toast.promise(promise(), {
      loading: 'Loading...',
      success: () => 'Login Succesfully',
      error: 'Email or password incorrect ',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-grey-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position='top-right' richColors/>
      <div className="max-w-lg w-full space-y-8 bg-white rounded-3xl shadow-md">
        <div>
          <h2 className="mt-6 text-[1.3rem] m-6 text-gray-900 font-arial">
            Welcome Back! <br />
            Exchange knowledge with more people.
          </h2>
        </div>
        {/* Mejorar mensaje */}
        {isLoading && 'Cargando...'}
        <form className="mt-8 space-y-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="flex justify-center">
              <div className="flex justify-center rounded-md border border-grey-200">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  {...register('email', { required: true })}
                  className="block w-full px-2 py-2 rounded-md sm:text-sm"
                  placeholder="Email"
                  style={{ maxWidth: '15rem' }}
                />
              </div>
            </div>
            <br />
            <div className="flex justify-center">
              <div className="flex justify-center rounded-md border border-grey-200">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  {...register('password', { required: true })}
                  className="block w-full px-2 py-2 rounded-md sm:text-sm"
                  placeholder="Password"
                  style={{ maxWidth: '15rem' }}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="flex justify-center">
              <span className="mr-2 text-[0.9rem]">Don't have an account?</span>
              <Link href={'/auth/sign-up'} legacyBehavior>
                <a className="font-bold text-black-500 text-[0.9rem]">
                  Register Here
                </a>
              </Link>
            </p>

            <p className="flex justify-center">
              <span className="mr-2 text-[0.9rem]">
                Can't remember your password?
              </span>
              <Link href={'/auth/forgot-password'} legacyBehavior>
                <a className="font-bold text-black-500 text-[0.9rem]">
                  Click Here
                </a>
              </Link>
            </p>
          </div>

          <div className="static">
            <button
              type="submit"
              className="w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-md rounded-tr-none rounded-tl-none text-white bg-gray-500 hover:bg-gray-600"
            >
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
