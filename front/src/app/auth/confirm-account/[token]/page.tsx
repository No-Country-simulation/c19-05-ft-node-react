'use client';
import Spinner from '@/components/Spinner/Spinner';
import { useAuth } from '@/context/session/sessionContext';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useParams, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function page() {
  const { token } = useParams<{ token: string }>();
  const { user, confirmEmail } = useAuth();
  const [message, setMessage] = useState('Confirming your e-mail');
  const [error, setError] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const confirmEmailAsync = async () => {
      try {
        await confirmEmail(token);
        setMessage('E-mail confirmed! Account created successfully.');
        setIsConfirmed(true);
        return;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          setError(true);
          setMessage(error.response.data.payload);
        }
      }
      setIsLoading(false);
    };
    confirmEmailAsync();
  }, []);

  if (user) return redirect('/connect');
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="bg-white p-6 border border-gray-200 shadow">
        <h1
          className={`text-lg p-4 ${error ? 'bg-red-500 border-2 border-red-600' : 'bg-green-500 border-2 border-green-600'} max-w-lg w-full text-center font-bold text-white`}
        >
          {message}
        </h1>
        {isLoading && (
          <div className="flex justify-center items-center mt-7">
            <Spinner />
          </div>
        )}
        {isConfirmed && (
          <div className="mt-4">
            <Link
              href="/auth/sign-in"
              className="text-gray-600 font-medium underline"
            >
              Sign In Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
