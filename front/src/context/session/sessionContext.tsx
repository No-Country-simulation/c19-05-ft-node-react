"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { User, Respuesta } from '@/types/user.type';



export type UserRegistrationForm = {
  name: string;
  email: string;
  password: string;
  repassword: string;
  phoneNumber: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isLoading: boolean
  isResponse:{status: boolean, message: string}
  login: (data:Pick<UserRegistrationForm,"email" | "password">) => Promise<void>;
  logout: () => Promise<void>
  registerContext: (data: UserRegistrationForm) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState<{status: boolean, message: string}>({status:false,message:""});

  useEffect(() => {
      const checkLoginEffect = async () => {
        try {
          const data = await checkLogin();
          if(!data) return
          setUser(data.payload)
        } catch (error) {
          if(isAxiosError(error) && error.response){
            return error.response.data
          }else if(error instanceof Error){
            return error.message
          }
        }
      }
      checkLoginEffect()
  }, []);

  const login = async (data:Pick<UserRegistrationForm,"email" | "password">) => {
    try {
      setIsLoading(true)
      const response = await api.post<{status:string,payload:string}>("/api/auth/login", data);
      const { status, payload } = response.data;
      if (status === "success") {
        setIsResponse({status:true,message:payload});
        const data = await checkLogin()
        setUser(data!.payload)
      }
      return
    }  catch (error) {
      if(isAxiosError(error) && error.response){
        console.log(error.response.data)
       return setIsResponse({status: false, message: error.response!.data.payload})
      } else if(error instanceof Error){
       return setIsResponse({status: false, message: error.message})
      }
    console.error('Registration error', error);
    return setIsResponse({status: false, message: String(error)})
  }finally{setIsLoading(false)} 
  };

  const checkLogin = async () => {
    try {
      setIsLoading(true)
      const {data} = await api<Respuesta>("/api/auth/user")
      if(data) return data
      return data
    } catch (error) {

    }finally{
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await api("/api/auth/logout")
      setUser(null)
    } catch (error) {
      console.log(error);
    }
  }

  const registerContext = async (data:UserRegistrationForm) => {
    try {
      setIsLoading(true)
      const response = await api.post(`/api/user`, data);
      const { status, payload } = response.data;

      if (status === "success"){ 
        setIsResponse({status: true, message:payload})
      } 
      return
      } catch (error) {
        if(isAxiosError(error)){
          console.log(error.response?.data)
         return setIsResponse({status: false, message: error.response?.data})
        } else if(error instanceof Error){
         return setIsResponse({status: false, message: error.message})
        }
      console.error('Registration error', error);
      return setIsResponse({status: false, message: String(error)})
    }finally{setIsLoading(false)} 
  };

  

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    logout,
    registerContext,
    isLoading,
    isResponse

  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export {AuthContext, AuthProvider}