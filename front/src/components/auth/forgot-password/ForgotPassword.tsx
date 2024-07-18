'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-grey-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position='top-right' richColors/>
      <div className="max-w-lg w-full space-y-8  bg-white rounded-3xl shadow-md">
        <div className="">
          <h2 className="mt-6 text-[1.7rem] text-center text-gray-900 font-arial">
            Enter the email to recover <br />
            the password
          </h2>
        </div>
        <form className="mt-8 space-y-14" onSubmit={handleSubmit}>
          <div className="flex justify-center rounded-md ">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" w-8/12 px-4 py-4 rounded-md sm:text-sm border border-grey-200"
              placeholder="Email"
              style={{ maxWidth: '18rem' }}
            />
          </div>

          <div className="static w-full  ">
            <button
              type="submit"
              className="w-full  flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-br-md rounded-bl-md  text-white bg-gray-500 hover:bg-gray-600"
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