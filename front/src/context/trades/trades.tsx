import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios, { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { data } from 'autoprefixer';
import {
  GetAllTrades,
  ResCRUDTrade,
  ResTradeDetails,
  Trade,
  TradeDetails,
} from '@/types/trade.type';

type memberType = {
  id: string;
  specialty: string;
};

type membersType = {
  memberOne: memberType;
  memberTwo: memberType;
};

type TradeRequest = {
  members: membersType;
  duration: number;
};

type TradesContextType = {
  trades: TradeDetails[];
  trade: TradeDetails | null;
  acceptTrade: (tradeId: string) => Promise<boolean>;
  createTrade: (tradeData: TradeRequest) => Promise<ResCRUDTrade | undefined>;
  detailsTrade: (tradeId: string) => Promise<boolean>;
  getAllTrades: () => Promise<void>;
  deleteTrade: (tradeId: string) => Promise<boolean>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const TradesContext = createContext<TradesContextType | undefined>(undefined);

export const useTrades = () => {
  const context = useContext(TradesContext);
  if (!context) {
    throw new Error('useTrades must be used within a TradesProvider');
  }
  return context;
};

type TradesProviderProps = {
  children: ReactNode;
};

const TradesProvider: React.FC<TradesProviderProps> = ({ children }) => {
  const [trades, setTrades] = useState<TradeDetails[]>([]);
  const [trade, setTrade] = useState<TradeDetails | null>(null);
  const [error, setError] = useState<string>('');
  const getAllTrades = async () => {
    try {
      // Simulate API call
      const { data } = await api.get<GetAllTrades>(`api/trade`);

      setTrades(data.payload);
    } catch (error) {
      if (isAxiosError(error)) {
      }
      throw error;
    }
  };

  const createTrade = async (tradeData: TradeRequest) => {
    try {
      // Simulate API call
      const { data } = await api.post<ResCRUDTrade>(`api/trade`, tradeData);
      // Update trade status to 'creacion'
      setTrades([...trades, data.payload]);
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

  const acceptTrade = async (tradeId: string): Promise<boolean> => {
    try {
      const { data } = await api.put<ResCRUDTrade>(`api/trade/${tradeId}`);
      // Update trade status to 'detalles' after accepting
      const newArray = trades.filter((trade) => trade._id !== data.payload._id);
      newArray.push(data.payload);
      setTrades(newArray);
      return true;
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

  const detailsTrade = async (tradeId: string) => {
    try {
      const { data } = await api.get<ResTradeDetails>(
        `api/trade/find-one/${tradeId}`
      );
      setTrade(data.payload);
      return true;
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

  const deleteTrade = async (tradeId: string): Promise<boolean> => {
    try {
      const { data } = await api.delete<ResCRUDTrade>(`api/trade/${tradeId}`);
      const newArray = trades.filter((trade) => trade._id !== data.payload._id);
      setTrades(newArray);
      return true;
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

  const contextValue: TradesContextType = {
    trades,
    trade,
    error,
    deleteTrade,
    acceptTrade,
    createTrade,
    detailsTrade,
    getAllTrades,
    setError,
  };

  return (
    <TradesContext.Provider value={contextValue}>
      {children}
    </TradesContext.Provider>
  );
};

export { TradesContext, TradesProvider };
