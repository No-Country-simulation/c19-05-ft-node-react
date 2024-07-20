'use client';
import Chat from '@/components/Chat/Chat';
import { useTrades } from '@/context/trades/trades';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function page() {
  const { tradeId } = useParams<{ tradeId: string }>();
  const { detailsTrade, trade } = useTrades();
  //   useEffect(() => {
  //     detailsTrade(tradeId);
  //   }, []);
  console.log(tradeId);

  return (
    <div className="xl:min-h-screen min-h-[calc(100vh-12rem)]  grid grid-flow-row    md:grid-flow-col grid-cols-1 md:grid-cols-2  xl:grid-flow-col  xl:grid-cols-2">
      <div className="w-full md:min-h-[500px]  bg-green-400">details</div>
      <div className="w-full  mt-24">
        <Chat />
      </div>
    </div>
  );
}
