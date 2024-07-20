'use client';

import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import TradeList from '@/components/Trades/TradeList';
import Spinner from '@/components/Spinner/Spinner';
import { useTrades } from '@/context/trades/trades';
import { useAuth } from '@/context/session/sessionContext';

const TradesPage: React.FC = () => {
  // const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const { getAllTrades, trades } = useTrades();
  const { user } = useAuth();

  useEffect(() => {
    getAllTrades();
    if (trades) setLoading(false);
  }, []);

  if (!user) return redirect('/auth/sign-in');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-26 sm:mt-24 lg:mt-24 min-h-[calc(100vh-8rem)]">
      <h1 className="text-4xl text-center font-medium mb-8 text-gray-800">
        My Trades
      </h1>
      <TradeList trades={trades} status="PENDING" />
      <TradeList trades={trades} status="ACCEPTED" />
      <TradeList trades={trades} status="FINISHED" />
    </div>
  );
};

export default TradesPage;
