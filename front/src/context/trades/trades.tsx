import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
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
  members: memberType;
  duration: number;
};

type TradesContextType = {
  trades: TradeDetails[];
  trade: TradeDetails | null;
  acceptTrade: (tradeId: string) => Promise<void>;
  createTrade: (tradeData: TradeRequest) => Promise<ResCRUDTrade>;
  detailsTrade: (tradeId: string) => Promise<void>;
  getAllTrades: () => Promise<void>;
  deleteTrade: (tradeId: string) => Promise<void>;
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

  const getAllTrades = async () => {
    try {
      // Simulate API call
      const { data } = await api.get<GetAllTrades>(`/api/trade`);

      setTrades(data.payload);
    } catch (error) {
      console.error('Get trades error:', error);
      throw error;
    }
  };

  const createTrade = async (tradeData: TradeRequest) => {
    try {
      // Simulate API call
      const { data } = await api.post<ResCRUDTrade>(`/api/trade`, tradeData);
      // Update trade status to 'creacion'
      return data;
    } catch (error) {
      console.error('Create trade error:', error);
      throw error;
    }
  };

  const acceptTrade = async (tradeId: string) => {
    try {
      const { data } = await api.put<ResCRUDTrade>(`/api/trade/${tradeId}`);
      // Update trade status to 'detalles' after accepting
      const newArray = trades.filter((trade) => trade._id !== data.payload._id);
      newArray.push(data.payload);
      setTrades(newArray);
    } catch (error) {
      console.error('Accept trade error:', error);
      throw error;
    }
  };

  const detailsTrade = async (tradeId: string) => {
    try {
      const { data } = await api.get<ResTradeDetails>(
        `/api/trade/find-one/${tradeId}`
      );

      setTrade(data.payload);
    } catch (error) {
      console.error('Details trade error:', error);
      throw error;
    }
  };

  const deleteTrade = async (tradeId: string) => {
    try {
      const { data } = await api.delete<ResCRUDTrade>(`/api/trade/${tradeId}`);
      const newArray = trades.filter((trade) => trade._id !== data.payload._id);
      setTrades(newArray);
    } catch (error) {
      console.error('Details trade error:', error);
      throw error;
    }
  };

  const contextValue: TradesContextType = {
    trades,
    trade,
    deleteTrade,
    acceptTrade,
    createTrade,
    detailsTrade,
    getAllTrades,
  };

  return (
    <TradesContext.Provider value={contextValue}>
      {children}
    </TradesContext.Provider>
  );
};

export { TradesContext, TradesProvider };
