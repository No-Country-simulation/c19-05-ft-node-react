'use client';

import api from '@/lib/axios';
import {
  GetUser,
  GetUserById,
  Paginate,
  ResponseGetUserById,
  ResponseGetUsers,
  ResponseUpdate,
  UpdateData,
} from '@/types/user.type';
import { isAxiosError } from 'axios';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

type UserContextType = {
  users: GetUser[];
  getUsers: (categoryId?: string) => Promise<void>;
  paginate: Paginate | null;
  isError: { status: boolean; message: string };
  getUserById: (userId: string) => Promise<ResponseGetUserById | undefined>;
};

const UserContext = createContext<UserContextType | undefined>(
  {} as UserContextType
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<GetUser[]>([]);
  const [paginate, setPaginate] = useState<Paginate | null>(null);
  const [isError, setIsError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: '',
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (categoryId?: string) => {
    const url =
      categoryId === undefined ? '/api/user/' : `/api/user/${categoryId}`;

    try {
      const { data } = await api<ResponseGetUsers>(url);
      setUsers(data.payload.docs);
      const paginate: Paginate = {
        hasNextPage: data.payload.hasNextPage,
        limit: data.payload.limit,
        hasPrevPage: data.payload.hasPrevPage,
        nextPage: data.payload.nextPage,
        page: data.payload.page,
        pagingCounter: data.payload.pagingCounter,
        prevPage: data.payload.prevPage,
        totalDocs: data.payload.totalDocs,
        totalPages: data.payload.totalPages,
      };
      setPaginate(paginate);
    } catch (error) {
      console.log(error);

      if (isAxiosError(error) && error.response) {
        setIsError({ status: true, message: error.response.data.payload });
      } else if (error instanceof Error) {
        setIsError({ status: true, message: error.message });
      } else {
        setIsError({ status: true, message: String(error) });
      }
    }
  };

  const getUserById = async (userId: string) => {
    try {
      const { data } = await api<ResponseGetUserById>(
        `/api/user/details/${userId}`
      );
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setIsError({ status: true, message: error.response.data.payload });
      } else if (error instanceof Error) {
        setIsError({ status: true, message: error.message });
      } else {
        setIsError({ status: true, message: String(error) });
      }
    }
  };

  const updateUser = async (formData: UpdateData) => {
    try {
      const { data } = await api.post<ResponseUpdate>(
        `/api/user/details/`,
        formData
      );
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setIsError({ status: true, message: error.response.data.payload });
      } else if (error instanceof Error) {
        setIsError({ status: true, message: error.message });
      } else {
        setIsError({ status: true, message: String(error) });
      }
    }
  };

  const contextValue: UserContextType = {
    users,
    getUsers,
    isError,
    paginate,
    getUserById,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
