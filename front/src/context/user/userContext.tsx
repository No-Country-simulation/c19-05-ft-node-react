'use client';

import api, { errorHandler, errorResponseType } from '@/lib/axios';
import {
  GetUser,
  GetUserById,
  Paginate,
  ResponseGetUserById,
  ResponseGetUsers,
  ResponseUpdate,
  UpdateData,
} from '@/types/user.type';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

type UserContextType = {
  users: GetUser[];
  paginate: Paginate;
  getUsers: (
    categoryId?: string,
    page?: number
  ) => Promise<void | errorResponseType>;
  getUserById: (
    userId: string
  ) => Promise<ResponseGetUserById | errorResponseType>;
  updateUser: (
    formData: UpdateData
  ) => Promise<ResponseUpdate | errorResponseType>;
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
  const [paginate, setPaginate] = useState<Paginate>({
    hasNextPage: false,
    limit: 10,
    hasPrevPage: false,
    nextPage: null,
    page: 1,
    pagingCounter: 0,
    prevPage: null,
    totalDocs: 0,
    totalPages: 0,
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async (categoryId?: string, page?: number) => {
    let url = '/api/user';

    if (categoryId) {
      url += `/${categoryId}`;
    }

    if (page) {
      url += `?page=${page}`;
    }

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
      return errorHandler(error);
    }
  };

  const getUserById = async (userId: string) => {
    try {
      const { data } = await api<ResponseGetUserById>(
        `/api/user/details/${userId}`
      );
      return data;
    } catch (error) {
      return errorHandler(error);
    }
  };

  const updateUser = async (formData: UpdateData) => {
    try {
      const { data } = await api.put<ResponseUpdate>(`/api/user/`, formData);
      return data;
    } catch (error) {
      return errorHandler(error);
    }
  };

  const contextValue: UserContextType = {
    users,
    getUsers,
    paginate,
    getUserById,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
