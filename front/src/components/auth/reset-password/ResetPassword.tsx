"use client";
import { useAuth } from "@/context/session/sessionContext";
import { Respuesta } from "@/types/user.type";
import React, { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { useParams } from 'next/navigation';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface FormValues {
    password: string;
    repassword: string;
}

const ResetPassword: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const { isLoading, resetPassword } = useAuth();
    const { token } = useParams<{ token: string }>();

    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const promise = async (): Promise<Respuesta> => {
            console.log(data);
            const response = await resetPassword(data, token);
            if (response.status !== "success") {
                throw new Error('Registration failed');
            }
            return response;
        };

        toast.promise(promise(), {
            loading: 'Loading...',
            success: () => 'Passwords reset successfully',
            error: 'The passwords don\'t match',
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-grey-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position='top-right' richColors />
            <div className="max-w-lg w-full space-y-8 bg-white rounded-3xl shadow-md">
                <div className=''> 
                    <h2 className="mt-6 text-[1.3rem] text-center text-gray-900 font-arial">
                        Create new password
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative">
                        <div className='flex justify-center'>
                            <div className='relative flex justify-center rounded-md border border-grey-200'>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
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
                                    placeholder="Password"
                                    style={{ maxWidth: '15rem' }}
                                />
                                <span
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                                </span>
                            </div>
                        </div>
                    </div>
                    {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                    <div className="relative">
                        <div className='flex justify-center'>
                            <div className='relative flex justify-center rounded-md border border-grey-200'>
                                <label htmlFor="repassword" className="sr-only">Re-password</label>
                                <input
                                    id="repassword"
                                    type={showRePassword ? 'text' : 'password'}
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
                                <span
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={() => setShowRePassword(!showRePassword)}
                                    aria-label={showRePassword ? 'Hide password' : 'Show password'}
                                >
                                    {showRePassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                                </span>
                            </div>
                        </div>
                    </div>
                    {errors.repassword && (
                        <span className="text-red-500">{errors.repassword.message}</span>
                    )}
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