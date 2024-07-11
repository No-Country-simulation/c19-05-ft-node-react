"use client";

import { useState } from "react";
import Alert from "@/components/Alert/Alert";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidEmail(email) && isValidPassword(password)) {
      setAlert({ message: "Login successful!", type: "success" });
    } else {
      setAlert({ message: "Email or password invalid.", type: "error" });
    }
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const closeAlert = () => {
    setAlert(null); // Cierra la alerta al hacer click en la X o al finalizar el tiempo
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-grey-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-6 rounded-3xl shadow-md">
        {/*contenedor del form de login*/}
        <div className="">
          {" "}
          {/* contenedor del h2 */}
          <h2 className="mt-6  text-[1.3rem]  text-gray-900  font-arial">
            Welcome Back! <br />
            Exchange knowledge with more people.
          </h2>
        </div>
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={closeAlert}
          />
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="">
            <div className="flex justify-center">
              <div className="flex justify-center rounded-md border border-grey-200">
                {/*contenedor del input de mail */}
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
                  className="block w-full px-2 py-2  rounded-md sm:text-sm"
                  placeholder="Email"
                  style={{ maxWidth: "15rem" }}
                />
              </div>
            </div>
            <br />
            <div className="flex justify-center">
              {/*contenedor del input de contraseña */}
              <div className="flex justify-center rounded-md border border-grey-200">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-2 py-2 rounded-md sm:text-sm"
                  placeholder="Password"
                  style={{ maxWidth: "15rem" }}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="flex justify-center">
              <span className="mr-2 text-[0.9rem]">Dont have an account?</span>
              <Link href={"/auth/sign-up"} legacyBehavior>
                <a className="font-bold text-black-500 text-[0.9rem]">
                  Register Here
                </a>
              </Link>
            </p>

            <p className="flex justify-center">
              <span className="mr-2 text-[0.9rem]">
                Can't remember your password?
              </span>
              <Link href={"/auth/forgot-password"} legacyBehavior>
                <a className="font-bold text-black-500 text-[0.9rem]">
                  Click Here
                </a>
              </Link>
            </p>
          </div>

          <div className="static">
            {/*contenedor del Boton de inicio de sesion*/}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600"
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
