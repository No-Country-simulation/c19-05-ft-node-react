'use client';
import Chat from '@/components/Chat/Chat';
import TradeDetails from '@/components/Trades/TradeDetails';
import { useTrades } from '@/context/trades/trades';
import { useParams, redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaCircleArrowRight } from 'react-icons/fa6';

export default function page() {
  const [show, setShow] = useState(false);
  const { tradeId } = useParams<{ tradeId: string }>();
  const { detailsTrade, trade } = useTrades();

  if (!trade) detailsTrade(tradeId);

  if (!trade) return redirect('/');

  return (
    <div className="xl:min-h-screen min-h-[calc(100vh-12rem)] sm:min-h-[calc(100vh-18rem)] mt-24 grid grid-flow-row md:grid-flow-col grid-cols-1 md:grid-cols-2  xl:grid-flow-col  xl:grid-cols-2">
      <div className="w-full md:min-h-[500px] relative ">
        <button
          className={`flex items-center gap-2 p-2 text-4xl border rounded-full sm:hidden absolute top-2 left-5 ${show ? 'hidden' : ''} `}
          onClick={() => setShow(!show)}
        >
          <FaCircleArrowRight />
        </button>
        <TradeDetails show={show} setShow={setShow} trade={trade} />
      </div>
      <div className="w-full  ">
        <Chat />
      </div>
    </div>
  );
}
