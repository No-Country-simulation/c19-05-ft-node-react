'use client';

import { ResponseMessage, useAuth } from '@/context/session/sessionContext';
import { useState, FormEvent, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import '../AuthCustom.css';

interface FormValues{
  email: string;
}

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { isLoading, forgotPassword2 } = useAuth();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const promise = async (): Promise <ResponseMessage>=> {
      const response = await forgotPassword2(data);
      if (response.status !== "success") {
        throw new Error('The email that you enter is not correct');
      }
      return response;
    };
  
    toast.promise(promise(), {
      loading: 'Loading...',
      success: () => 'An Email Have Been Send Check It',
      error: 'The email that you enter is not correct',
    });
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-grey-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position='top-right' richColors/>
      <div className="max-w-lg w-full space-y-8 bg-white rounded-lg shadow-md">
        <div className="">
          <h2 className="mt-6 text-[1.7rem] text-center text-gray-900 font-arial">
            Enter the email to recover <br />
            the password
          </h2>
        </div>
        <form className="mt-8 space-y-14" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form-fields d-flex justify-center rounded-md ">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              type="email"
              autoComplete="email"
              required
              {...register('email', { required: true })}
              className=" w-8/12 px-4 py-4 rounded-md sm:text-sm border border-grey-200"
              placeholder="Email"
              style={{ width: '100%' }}
            />
          </div>

          <div className="static w-full  ">
            <button
              type="submit"
              className="w-full  flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-br-md rounded-bl-md  text-white bg-green-400 hover:bg-green-500"
            >
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;