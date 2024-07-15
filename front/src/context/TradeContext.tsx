"use client";
import React, { useContext, createContext, ReactNode } from "react";

//============User state===========================
import { IUser } from "@/interfaces/IUser";

//=============hook con toda la fucionalidad===================
import useContextTradeHook from "@/hook/useContextTradeHook";

interface TradeContextProps {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

//============contexto=============
const TradeContext = createContext<TradeContextProps | undefined>(undefined);

//============provider==============================

interface PropsChildren {
  children: ReactNode;
}

// ===========provider==============================
const TradeProvider = ({ children }: PropsChildren) => {
  //traigo los datos del hook
  const { user, login, logout, isAuthenticated } = useContextTradeHook();
  return (
    <TradeContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </TradeContext.Provider>
  );
};

//===========EXPORTAMOS EL PROVIDER Y EL CONTEXTO COMO HOOK 😀=======================================

export default TradeProvider;

export const useTradeContext = () => {
  const context = useContext(TradeContext);

  if (!context) {
    throw new Error("No context provided");
  }
  return context;
};

//NOTAR QUE YA DEVUELVO EL CONTEXTO
