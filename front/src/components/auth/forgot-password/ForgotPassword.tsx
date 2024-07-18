'use client';

import { useState, FormEvent, useEffect } from 'react';
import Alert from '@/components/Alert/Alert';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const [alert, setAlert] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    // Verifica que el componente esté montado en el cliente
    if (typeof window !== 'undefined') {
      // Código que solo se ejecuta en el cliente
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidEmail = (email: string): boolean => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (isValidEmail(email)) {
      // Redirigir al usuario y mensaje de exito
      setAlert({ message: 'Confirm Changes at your mail', type: 'success' });
      // Usa router para redirigir
      // router.push("/");
    } else {
      // Mensaje de correo no valido o inexistente
      setAlert({
        message: 'Please enter a valid email address.',
        type: 'error',
      });
    }
  };

  const closeAlert = () => {
    setAlert(null); // Cierra la alerta al hacer click en la X o finaliza el tiempo
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-grey-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8  bg-white rounded-3xl shadow-md">
        <div className="">
          <h2 className="mt-6 text-[1.7rem] text-center text-gray-900 font-arial">
            Enter the email to recover <br />
            the password
          </h2>
        </div>
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={closeAlert}
          />
        )}
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