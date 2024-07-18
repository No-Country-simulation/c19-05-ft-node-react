
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

interface ResponseMessage {
  status: string;
  payload: string;
}

interface LoginData {
  email: string;
  password: string;
}

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => Promise<ResponseMessage>;
  registerContext: (data: UserRegistrationForm) => Promise<ResponseMessage>;
  confirmEmail: (token: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  useEffect(() => {
    getSession();
  }, []);

  const login = async (loginData: LoginData) => {
    try {
      const { data } = await api.post<Respuesta>("/api/auth/login", loginData);
      setUser(data.payload)
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.error(error.response.data);
      } else if (error instanceof Error) {
        console.error('Login error', error);
      }
      throw error;
    } 
  };

  const getSession = async () => {
    try {
      setIsLoading(true);
      const { data } = await api<Respuesta>("/api/auth/user");
      setUser(data.payload as User);
    } catch (error) {
      console.error('Get session error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<ResponseMessage> => {
    try {
      const { data } = await api<ResponseMessage>("/api/auth/logout");
      setUser(null);
      return data;
    } catch (error) {
      console.error('Logout error', error);
      throw error;
    }
  };

  const registerContext = async (data: UserRegistrationForm): Promise<ResponseMessage> => {
    try {
      setIsLoading(true);
      const response = await api.post("/api/user", data);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data);
      } else if (error instanceof Error) {
        console.error('Registration error', error);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmEmail = async (token: string): Promise<void> => {
    try {
      const { data } = await api<Respuesta>(`/api/user/confirm-email/${token}`);
      setUser(data.payload)
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.payload);
      }
      throw new Error('Error confirming email');
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    isLoading,
    login,
    logout,
    registerContext,
    confirmEmail
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };