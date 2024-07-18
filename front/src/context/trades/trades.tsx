import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import api from '@/lib/axios';
import { data } from 'autoprefixer';




type memberType = {
  id: string;
  specialty: string;
};

type membersType = {
  memberOne: memberType;
  memberTwo: memberType;
};


interface Trade {
  _id: string;
  members: membersType ;
  duration: number;
  expiresAt: Date | null;
  status: 'PENDING' | 'ACCEPTED' | 'FINISHED';
}

type TradeRequest = {
  members: membersType 
  duration: number;
};

interface ResponseTrade{
  status: string;
  payload: Trade;
}

interface ResponseTradeArray{
  status: string;
  payload:Trade[]
}




type TradesContextType = {
  trades: Trade[];
  acceptTrade: (tradeId: string) => Promise<ResponseTrade>;
  createTrade: (tradeData: TradeRequest) => Promise<ResponseTrade>;
  detailsTrade: (tradeId: string) => Promise<ResponseTrade>
  getAllTrades:(userTrades:string[])=> Promise<ResponseTradeArray>
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
  const [trades, setTrades] = useState<Trade[]>([]);

  const getAllTrades = async (userTrades:string[]) => {
    try {
      // Simulate API call
     const {data} = await api.get<ResponseTradeArray>(`/api/trade`);
      setTrades(data.payload)
      return data
    } catch (error) {
      console.error('Get trades error:', error);
      throw error;
    }
  };

  const createTrade = async (tradeData: TradeRequest) => {
    try {
      // Simulate API call
      const {data} = await api.post<ResponseTrade>(`/api/trade`, tradeData);
      
      // Update trade status to 'creacion'
      setTrades((prevTrades) => [...prevTrades, data.payload]);
      return data
    } catch (error) {
      console.error('Create trade error:', error);
      throw error;
    }
  };

  const acceptTrade = async (tradeId: string) => {
    try {
    const {data} = await api.put<ResponseTrade>(`/api/trade/${tradeId}`);
      // Update trade status to 'detalles' after accepting
      setTrades((prevTrades) =>
        prevTrades.map((trade) =>
          trade._id === data.payload._id ? { ...trade, status: 'ACCEPTED' } : trade
        )
      );
      return data
    } catch (error) {
      console.error('Accept trade error:', error);
      throw error;
    }
  };

  const detailsTrade = async (tradeId: string) => {
    try {
     const {data} = await api.get<ResponseTrade>(`/api/find-one/${tradeId}`);
     return data
    } catch (error) {
      console.error('Details trade error:', error);
      throw error;
    }
  };

  const contextValue: TradesContextType = {
    trades,
    acceptTrade,
    createTrade,
    detailsTrade,
    getAllTrades
  };

  return <TradesContext.Provider value={contextValue}>{children}</TradesContext.Provider>;
};

export { TradesContext, TradesProvider };