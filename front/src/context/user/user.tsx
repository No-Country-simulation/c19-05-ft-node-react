"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

type User = {
  id: string;
  username: string;
  email: string;
};

type UserContextType = {
  users: User[];
  getUser: (userId: string) => User | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

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
  const [users] = useState<User[]>([]);

  const getUser = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    return user || null;
  };

  

  const contextValue: UserContextType = {
    users,
    getUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export{UserContext, UserProvider }