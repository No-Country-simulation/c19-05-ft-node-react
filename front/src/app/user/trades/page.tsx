'use client'

import React, { useEffect, useState } from 'react';
import { Trade } from '@/lib/data'; 
import { trades as mockTrades } from '@/lib/data'; 
import TradeList from '@/components/Trades/TradeList'; 
import Spinner from '@/components/Spinner/Spinner';

const TradesPage: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        // Simula la obtención de datos de la API con un retraso
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTrades(mockTrades);
      } catch (error) {
        console.error('Error fetching trades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  if (loading) {
    return <div className='flex justify-center items-center min-h-screen'><Spinner/></div>;
  }

  return (
    <div className='container mx-auto mt-32 sm:mt-24'>
      <h1 className="text-4xl text-center font-medium mb-8 text-gray-800">My Trades</h1>
      <TradeList trades={trades} status="Pending" />
      <TradeList trades={trades} status="In Progress" />
      <TradeList trades={trades} status="Completed" />
    </div>
  );
};

export default TradesPage;
