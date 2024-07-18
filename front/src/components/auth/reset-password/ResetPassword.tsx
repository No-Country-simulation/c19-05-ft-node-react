"use client"


import { useState } from "react";
import Alert from "@/components/Alert/Alert";

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== rePassword) {
            setAlert({message: 'Passwords do not match. Please re-enter.', type: "error"});
            return;
        }
        
        setAlert({message: 'Password submitted successfully!', type:"success"});
    };

    const closeAlert = () => {
        setAlert(null); // Cierra la alerta al hacer click en la X o al finalizar el tiempo
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-grey-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-white rounded-3xl shadow-md">
                <div className=''> {/* contenedor del h2 */}
                    <h2 className="mt-6  text-[1.3rem] text-center  text-gray-900  font-arial">Create new password </h2>
                </div>
                {alert && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="">
                        <div className='flex justify-center'>{/*contenedor del input de contraseña */}
                            <div className='flex justify-center rounded-md border border-grey-200'>
                            <label htmlFor="password" className="sr-only">Password</label>
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
                                style={{ maxWidth: '15rem' }}
                            />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                            <div className='flex justify-center rounded-md border border-grey-200'> 
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                               id="repassword"
                               name="repassword"
                               type="password"
                               autoComplete="new-password"
                               required
                               value={rePassword}
                               onChange={(e) => setRePassword(e.target.value)}
                               className="block w-full px-2 py-2 rounded-md sm:text-sm"
                               placeholder="Re-password"
                               style={{ maxWidth: '240px' }}
                              />
                             </div>
                        </div>
                    <div className='static'>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-5 px-4 border border-transparent text-sm font-medium rounded-md rounded-tl-none rounded-tr-none text-white bg-gray-500 hover:bg-gray-600"
                        >
                           SEND
                        </button>   
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;