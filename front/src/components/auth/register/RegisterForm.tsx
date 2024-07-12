"use client";
import { useState } from "react";
import Alert from "@/components/Alert/Alert";
import Link from "next/link";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  //===================handle submit=======================================

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== rePassword) {
      setAlert({
        message: "Passwords do not match. Please re-enter.",
        type: "error",
      });
      return;
    }

    if (accountCreatedSuccessfully()) {
      setAlert({ message: "Account created successfully!", type: "success" });
    } else {
      setAlert({
        message: "Email is already in use. Please use another one.",
        type: "error",
      });
    }

    //esta parte tiene un true ya que al no haber una base de datos en la cual chequear si el mail esta en uso la deje asi para que pase la prueba
    //si ponemos false veremos el segundo mensaje que esta arriba
    function accountCreatedSuccessfully(): boolean {
      return true;
    }

    //una vez el formulario este completo se vacian los strings

    setName("");
    setEmail("");
    setPassword("");
    setRePassword("");
    setPhone("");
  };

  const closeAlert = () => {
    setAlert(null); // Cierra la alerta al hacer click en la X o al finalizar el tiempo
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-grey-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg  w-full space-y-8 bg-white p-6 rounded-3xl shadow-md">
        {/*contenedor del form de login*/}
        <div className="">
          {" "}
          {/* contenedor del h2 */}
          <h2 className="mt-6  text-[1.6rem]  text-gray-900  font-arial">
            Register. <br />
            its quick and easy
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
                {" "}
                {/* Container for Name input */}
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-2 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Name"
                  style={{ maxWidth: "240px" }}
                />
              </div>
            </div>
            <br />
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
                  className="block w-full px-2 py-2  rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email"
                  style={{ maxWidth: "240px" }}
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
                  style={{ maxWidth: "240px" }}
                />
              </div>
            </div>
            <br />
            <div className="flex justify-center">
              <div className="flex justify-center rounded-md border border-grey-200">
                {" "}
                {/*Contenedor del input Re-password*/}
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="re-password"
                  name="re-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  className="block w-full px-2 py-2 rounded-md sm:text-sm"
                  placeholder="Re-password"
                  style={{ maxWidth: "240px" }}
                />
              </div>
            </div>
            <br />
            <div className="flex justify-center">
              <div className="flex justify-center rounded-md border border-grey-200">
                {" "}
                {/*Contenedor del input Telefono*/}
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full px-2 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Phone"
                  style={{ maxWidth: "240px" }}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="flex justify-center">
              <span className="mr-2 text-[0.9rem]">
                Already have an account?
              </span>{" "}
              <Link href={"/auth/sign-in"} legacyBehavior>
                <a className="font-bold text-black-500 text-[0.9rem]">
                  Click Here
                </a>
              </Link>
            </p>
          </div>

          <div>
            {/*contenedor del Boton de Crear cuenta*/}
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
