'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@/context/session/sessionContext';
import { Toaster, toast } from 'sonner';
import { Respuesta } from '@/types/user.type';
import '../AuthCustom.css';
import { FcGoogle } from 'react-icons/fc';
import LogoGreenSVG from '@/assets/logos/LogoGreenSVG';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

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

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const promise = async (): Promise<Respuesta> => {
      const response = await login(data);
      if (response.status !== 'success') {
        throw new Error('Login failed');
      }
      return response;
    };

    toast.promise(promise(), {
      loading: 'Loading...',
      success: () => 'Login Successful',
      error: 'Email or password incorrect',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center m-8 bg-gradient-to-tr from-grey-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors />
      <div className="max-w-lg w-full space-y-8 pb-10 bg-white rounded-xl shadow-md">
        <div className="flex">
          <LogoGreenSVG width={'3rem'} height={'3rem'} className="ml-24 mt-4" />
          <h2 className="mt-6 text-[1.3rem] ml-6 text-gray-900 font-arial">
            Welcome Back! <br />
            Exchange knowledge <br /> with more people.
          </h2>
        </div>

        {isLoading && 'Loading...'}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form-fields">
            <div className="relative">
              <div className="d-flex justify-center rounded-xl border border-grey-200">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  {...register('email', { required: true })}
                  className="block w-full px-4 py-4 rounded-xl sm:text-sm"
                  placeholder="Email"
                />
              </div>
            </div>
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
            <br />
            <div className="relative">
              <div className="d-flex justify-center rounded-xl border border-grey-200">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  {...register('password', { required: true })}
                  className="block w-full px-4 py-4 rounded-xl sm:text-sm"
                  placeholder="Password"
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </span>
              </div>
            </div>
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
            <br />
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-96 flex justify-center py-4 px-3 border border-transparent text-sm font-medium rounded-xl text-white bg-green-400 hover:bg-green-500"
            >
              LOG IN
            </button>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <hr className="border-gray-900 w-48" />
            <span className="text-gray-900 font-medium">or</span>
            <hr className="border-gray-900 w-48" />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="relative w-96 flex justify-start items-center py-4 px-3 border border-gray-300 text-sm font-medium rounded-xl text-gray-900 bg-white hover:bg-gray-100"
            >
              <FcGoogle size={30} />
              <span className="flex-1 font-sans">Continue with Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
