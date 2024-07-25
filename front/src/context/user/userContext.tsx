'use client';

import api, { errorHandler, errorResponseType } from '@/lib/axios';
import {
  GetUser,
  GetUserById,
  Paginate,
  ResponseGetRecommendedUsers,
  ResponseGetUserById,
  ResponseGetUsers,
  ResponseUpdate,
  ResponseUserRating,
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
  getRecommendedUsers: (
    categoryId?: string,
    page?: number
  ) => Promise<void | errorResponseType>;
  updateRating: (
    formData: {
      comment: string;
      rating: number;
    },
    userId: string,
    tradeId: string
  ) => Promise<ResponseUserRating>;
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
      const { docs, ...paginateInfo } = data.payload;
      setUsers(docs);
      setPaginate(paginateInfo);
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

  const getRecommendedUsers = async (categoryId?: string, page?: number) => {
    let url = '/api/user/potential-trades';

    if (categoryId) {
      url += `/${categoryId}`;
    }

    if (page) {
      url += `?page=${page}`;
    }

    try {
      const { data } = await api<ResponseGetUsers>(url);
      const { docs, ...paginateInfo } = data.payload;
      setUsers(docs);
      setPaginate(paginateInfo);
    } catch (error) {
      return errorHandler(error);
    }
  };
  const updateRating = async (
    formData: { comment: string; rating: number },
    userId: string,
    tradeId: string
  ) => {
    try {
      const { data } = await api.put<ResponseUserRating>(
        `/api/user/${userId}/update-rating/${tradeId}`,
        formData
      );
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const errorInfo = error.response.data as {
          status: string;
          payload: string;
        };
        throw new Error(errorInfo.payload);
      } else if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('ERROR INNESPERADO');
    }
  };

  const contextValue: UserContextType = {
    users,
    getUsers,
    updateRating,
    paginate,
    getUserById,
    updateUser,
    getRecommendedUsers,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
