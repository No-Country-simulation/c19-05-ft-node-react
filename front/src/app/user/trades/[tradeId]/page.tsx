'use client';

import Chat from '@/components/Chat/Chat';
import TradeDetails from '@/components/Trades/TradeDetails';
import { useChat } from '@/context/chat/ChatContext';
import { useTrades } from '@/context/trades/trades';
import { TradeDetails as TradeDetailsType } from '@/types/trade.type';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaCircleArrowRight } from 'react-icons/fa6';

export default function Page() {
  const [show, setShow] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [trade, setTrade] = useState<TradeDetailsType>();
  const { tradeId } = useParams<{ tradeId: string }>();
  const {
    getMessagesContext,
    state: chatState,
    channelDisconnect,
    createChannelConnection,
  } = useChat();
  const { trades } = useTrades();
  const router = useRouter();

  useEffect(() => {
    const foundTrade = trades.find((trade) => trade._id === tradeId);

    if (foundTrade) {
      setTrade(foundTrade);
      setFirstLoad(false);
    } else {
      // Si no se encuentra el comercio, redirigir a una página de error
      router.push('/laconchatumadre');
    }
  }, [tradeId, trades, router]);

  useEffect(() => {
    if (trade && trade.chatRoom) {
      getMessagesContext(trade.chatRoom);
      createChannelConnection(trade._id);
    }
    return () => {
      if (trade && trade.chatRoom) {
        channelDisconnect();
      }
    };
  }, [trade]);

  if (firstLoad) {
    return null; // Mostrar un loader o componente de carga mientras se carga el comercio
  }

  return (
    <div className="lg:min-h-[calc(100vh-20rem)] min-h-[calc(100vh-24rem)] sm:min-h-[calc(100vh-40rem)] md:min-h-screen mt-[97px] sm:mt-16 sm:grid sm:grid-flow-col grid-cols-1 sm:grid-cols-2  xl:grid-flow-col  xl:grid-cols-2">
      <div className="w-full md:min-h-[500px]  ">
        <button
          className={`flex items-center gap-2 p-2 text-3xl  sm:hidden absolute top-[53px] z-50 left-[1px] ${show ? 'hidden' : ''}`}
          onClick={() => setShow(!show)}
        >
          <FaCircleArrowRight />
        </button>
        {trade && <TradeDetails show={show} setShow={setShow} trade={trade} />}
      </div>
      <div className="w-full h-[50%]">
        {trade && <Chat messages={chatState.messages} trade={trade} />}
      </div>
    </div>
  );
}
