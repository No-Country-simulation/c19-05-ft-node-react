'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@/context/session/sessionContext';
import { Toaster, toast } from 'sonner';
import '../AuthCustom.css';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Importar íconos de ojo
import LogoGreenSVG from '@/assets/logos/LogoGreenSVG';

interface FormValues {
  name: string;
  email: string;
  password: string;
  repassword: string;
}

const RegisterForm: React.FC = () => {
  const { registerContext, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const promise = async () => {
      const response = await registerContext(data);
      if (response.status !== 'success') {
        throw new Error('Registration failed');
      }
      return response;
    };

    toast.promise(promise(), {
      loading: 'Loading...',
      success: () => 'An email has been sent, please verify it',
      error: 'Registration error. Please try again.',
    });
  };

  const password = watch('password');

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors />
      <div className="max-w-lg w-full space-y-4 pb-10 bg-white rounded-xl shadow-md">
        <div className="flex">
          <LogoGreenSVG width={'3rem'} height={'3rem'} className="ml-24 mt-4" />
          <h2 className="mt-4 text-[1.6rem] text-center text-gray-900 font-arial">
            Register. <br />
            it's quick and easy
          </h2>
        </div>
        {isLoading && 'Cargando...'}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form-fields">
            <div className="d-flex justify-center">
              <div className="d-flex justify-center rounded-xl border border-grey-200">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  {...register('name', { required: true })}
                  className="block w-full px-3 py-3 rounded-xl sm:text-sm"
                  placeholder="Name"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
            <br />
            <div className="d-flex justify-center">
              <div className="d-flex justify-center rounded-xl border border-grey-200">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  {...register('email', { required: true })}
                  className="block w-full px-3 py-3 rounded-xl sm:text-sm"
                  placeholder="Email address"
                  type="email"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            {errors.email && (
              <span className="text-red-500">Email address is required</span>
            )}
            <br />
            <div className="d-flex justify-center relative">
              <div className="d-flex justify-center rounded-xl border border-grey-200">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*._])[A-Za-z\d!@#$%^&*._]{8,}$/,
                      message:
                        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
                    },
                  })}
                  className="block w-full px-3 py-3 rounded-xl sm:text-sm"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  style={{ width: '100%' }}
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
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
              <span className="text-red-500">
                Password must be at least 8 characters and contain a special
                character
              </span>
            )}
            <br />
            <div className="d-flex justify-center relative">
              <div className="d-flex justify-center rounded-xl border border-grey-200">
                <label htmlFor="re-password" className="sr-only">
                  Re-enter Password
                </label>
                <input
                  id="repassword"
                  {...register('repassword', {
                    required: '',
                    validate: (value) =>
                      value === password ||
                      "The passwords don't match. Try again",
                  })}
                  className="block w-full px-3 py-3 rounded-xl sm:text-sm"
                  placeholder="Re-enter Password"
                  type={showRePassword ? 'text' : 'password'}
                  style={{ width: '100%' }}
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowRePassword(!showRePassword)}
                >
                  {showRePassword ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </span>
              </div>
            </div>
            {errors.repassword && (
              <span className="text-red-500">{errors.repassword.message}</span>
            )}
            <br />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-96 flex justify-center py-4 px-3 border border-transparent text-sm font-medium rounded-xl text-white bg-green-400 hover:bg-green-500"
            >
              CREATE ACCOUNT
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

export default RegisterForm;
