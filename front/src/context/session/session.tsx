"use client"

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios, { isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import api from '@/lib/axios';

type User = {
  id: string;
  name: string;
  email: string;
};

export type UserRegistrationForm = {
  name: string;
  email: string;
  password: string;
  repassword: string;
  phoneNumber: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean
  isResponse:{status: boolean, message: string} | null
  login: (email: string, password: string) => Promise<void>;
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
  const [isResponse, setIsResponse] = useState<{status: boolean, message: string}| null>(null);


  useEffect(() => {
    const token = Cookies.get("token"); //trae el token
    if (token) {
      api
        .get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`, //debemos cambiar el nombre si es otro "tocken o no se "
          },
        })
        .then((response) => {
          setUser(response.data); //usar data en axios (casi me olvido)
        })
        .catch(() => {
          Cookies.remove("token");
          setUser(null);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const { status, payload } = response.data;
      
      if (status === "success") {
        // Guardar el payload (que podría contener datos del usuario) en el estado
        setUser(payload);
        
        // Guardar algún tipo de identificador o información adicional en las cookies
        // Cookies.set("someKey", payload.someData);
  
        // Redirigir al dashboard después del inicio de sesión exitoso
        // router.push("/dashboard");
      } else {
        throw new Error("Login falló: " + payload);
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión", error);
      throw error;
    }
  };

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
    login,
    registerContext,
    isLoading,
    isResponse

  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export {AuthContext, AuthProvider}