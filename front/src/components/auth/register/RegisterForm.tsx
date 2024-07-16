'use client';

import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@/context/session/sessionContext';

interface FormValues {
  name: string;
  email: string;
  password: string;
  repassword: string;
  phoneNumber: string;
}

const RegisterForm: React.FC = () => {
  const { registerContext, isLoading, isResponse } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [alert, setAlert] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log('NO ANDA UNA MIERDA ACA');
      await registerContext(data);
      console.log(isResponse);
    } catch (error) {
      console.error('Registration error:', error);
      setAlert({
        message: 'Failed to create account. Please try again.',
        type: 'error',
      });
    }
  };

  const password = watch('password');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-grey-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg  w-full space-y-8 bg-white p-6 rounded-3xl shadow-md">
        <div>
          <h2 className="mt-6 text-[1.6rem] text-gray-900 font-arial">
            Register. <br />
            it's quick and easy
          </h2>
        </div>
        {isLoading && 'Cargando...'}
        {isResponse && isResponse.message}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex justify-center">
              <div className="flex justify-center rounded-md border border-grey-200">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  {...register('name', { required: true })}
                  className="block w-full px-2 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Name"
                  style={{ maxWidth: '240px' }}
                />
              </div>
            </div>
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
            <br />
            <div className="flex justify-center">
              <div className="flex justify-center rounded-md border border-grey-200">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  {...register('email', { required: true })}
                  className="block w-full px-2 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  type="email"
                  style={{ maxWidth: '240px' }}
                />
              </div>
            </div>
            {errors.email && (
              <span className="text-red-500">Email address is required</span>
            )}
            <br />
            <div className="flex justify-center">
              <div className="flex justify-center rounded-md border border-grey-200">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  {...register('password', {
                    required: 'Passwod is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                      message:
                        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
                    },
                  })}
                  className="block w-full px-2 py-2 rounded-md sm:text-sm"
                  placeholder="Password"
                  type="password"
                  style={{ maxWidth: '240px' }}
                />
              </div>
            </div>
            {errors.password && (
              <span className="text-red-500">
                Password must be at least 8 character and contain a special
                character
              </span>
            )}
            <br />
            <div className="flex justify-center">
              <div className="flex justify-center rounded-md border border-grey-200">
                <label htmlFor="re-password" className="sr-only">
                  Re-enter Password
                </label>
                <input
                  id="repassword"
                  {...register('repassword', {
                    required: 'La concha de tu madre',
                    validate: (value) =>
                      value === password ||
                      'The passwords dont match try again',
                  })}
                  className="block w-full px-2 py-2 rounded-md sm:text-sm"
                  placeholder="Re-enter Password"
                  type="password"
                  style={{ maxWidth: '240px' }}
                />
              </div>
            </div>
            {errors.repassword && (
              <span className="text-red-500">{errors.repassword.message}</span>
            )}
            <br />
            <div className="flex justify-center">
              <div className="flex justify-center rounded-md border border-grey-200">
                <label htmlFor="phoneNumber" className="sr-only">
                  Phone
                </label>
                <input
                  id="phoneNumber"
                  {...register('phoneNumber', { required: true })}
                  className="block w-full px-2 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Phone"
                  style={{ maxWidth: '240px' }}
                />
              </div>
            </div>
            {errors.phoneNumber && <span className="text-red-500"></span>}
          </div>

          <div>
            <p className="flex justify-center">
              <span className="mr-2 text-[0.9rem]">
                Already have an account?
              </span>{' '}
              <Link href={'/auth/sign-in'} legacyBehavior>
                <a className="font-bold text-black-500 text-[0.9rem]">
                  Click Here
                </a>
              </Link>
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600"
            >
              CREATE ACCOUNT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
