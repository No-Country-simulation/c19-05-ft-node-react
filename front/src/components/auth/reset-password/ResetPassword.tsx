"use client"
import { useAuth } from "@/context/session/sessionContext";
import { Respuesta } from "@/types/user.type";
import React from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toaster, toast } from 'sonner'
import { useParams} from 'next/navigation';

interface FormValues {
    password: string
    repassword: string
}




const ResetPassword: React.FC = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormValues>();
      const { isLoading, resetPassword} = useAuth();
      const { token } = useParams<{ token: string }>();

      const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const promise = async (): Promise <Respuesta>=> {
            console.log(data)
          const response = await resetPassword(data, token);
          if (response.status !== "success") {
            throw new Error('Registration failed');
          }
          return response;
        };
      
        toast.promise(promise(), {
          loading: 'Loading...',
          success: () => 'Passwords reset successfuly',
          error: 'The passwords doesnt match',
        });
      };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-grey-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position='top-right' richColors/>
            <div className="max-w-lg w-full space-y-8 bg-white rounded-3xl shadow-md">
                <div className=''> {/* contenedor del h2 */}
                    <h2 className="mt-6  text-[1.3rem] text-center  text-gray-900  font-arial">Create new password </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        <div className='flex justify-center'>{/*contenedor del input de contraseña */}
                            <div className='flex justify-center rounded-md border border-grey-200'>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                type="password"
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
                                style={{ maxWidth: '15rem' }}
                            />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                            <div className='flex justify-center rounded-md border border-grey-200'> 
                            <label htmlFor="name" className="sr-only">repassword</label>
                            <input
                               id="repassword"
                               type="password"
                               {...register('repassword', {
                                required: 'Password is required',
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