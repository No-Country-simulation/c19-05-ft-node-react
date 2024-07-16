import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';


type Trade = {
  id: string;
  status: 'creacion' | 'aceptado' | 'detalles' | 'historial'; // Actualizamos los estados del trade
};

type Member = {
  id: string;
  specialty: string;
};

type TradeRequest = {
  members: {
    memberOne: Member;
    memberTwo: Member;
  };
  duration: number;
};

type AcceptTradeRequest = {
  tradeId: string;
};

type TradesContextType = {
  trades: Trade[];
  acceptTrade: (acceptData: AcceptTradeRequest) => Promise<void>;
  createTrade: (tradeData: TradeRequest) => Promise<void>;
  detailsTrade: (tradeId: string, tradeData: TradeRequest) => Promise<void>; 
  getAllTrades:(userTrades:string[])=> Promise<void>
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
      await axios.get(`/api/trade/`);
      // Update trade status to 'Get all trades'
    setTrades((prevTrades) => [...prevTrades, { id: '1', status: 'historial' }]);
    } catch (error) {
      console.error('Get trades error:', error);
      throw error;
    }
  };

  const createTrade = async (tradeData: TradeRequest) => {
    try {
      // Simulate API call
      await axios.post(`/api/trade`, tradeData);
      
      // Update trade status to 'creacion'
      setTrades((prevTrades) => [...prevTrades, { id: '1', status: 'creacion' }]);
    } catch (error) {
      console.error('Create trade error:', error);
      throw error;
    }
  };

  const acceptTrade = async (acceptData: AcceptTradeRequest) => {
    try {
      await axios.post(`/api/trade/${acceptData.tradeId}`);
      // Update trade status to 'detalles' after accepting
      setTrades((prevTrades) =>
        prevTrades.map((trade) =>
          trade.id === acceptData.tradeId ? { ...trade, status: 'aceptado' } : trade
        )
      );
    } catch (error) {
      console.error('Accept trade error:', error);
      throw error;
    }
  };

  const detailsTrade = async (tradeId: string) => {
    try {
      await axios.get(`/api/find-one/${tradeId}`);
      // Update trade status to 'detalles'
      setTrades((prevTrades) => [...prevTrades, { id: tradeId, status: 'detalles' }]);
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