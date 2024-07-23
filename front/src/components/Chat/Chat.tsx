import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import ChatWin from './ChatWin';
import { TradeDetails } from '@/types/trade.type';
import { Message } from '@/types/chat.type';
import { useAuth } from '@/context/session/sessionContext';
import { useRouter } from 'next/navigation';
import { useChat } from '@/context/chat/ChatContext';
import { FaCircleArrowRight } from "react-icons/fa6";
import { IoDocumentAttach } from "react-icons/io5";
import { px } from 'framer-motion';
import { string } from 'zod';

export default function Chat({
  messages,
  trade,
}: {
  messages: Message[];
  trade: TradeDetails;
}) {
  const [newMessage, setNewMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useAuth();
  const { sendMessageContext, sendMessageSupabase } = useChat();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      }); // Ajustamos para que haga scroll hasta el final del bloque
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  const receiverId =
    trade.members.memberOne.id._id === user?._id
      ? trade.members.memberTwo.id._id
      : trade.members.memberOne.id._id;

  const handleSubmit = async () => {
    if (!newMessage) return;
    const formData = {
      senderId: user!._id,
      receiverId,
      message: newMessage,
      chatRoomId: trade.chatRoom,
    };
    const result = await sendMessageContext(formData);
    if (result) {
      sendMessageSupabase(result);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (!user) router.push('/404');
  }, [user]);

  return (
    <div className="div-container-chat">
      <div className="chat-container p-2 sm:p-4 bg-[#FFF]">
        {messages.map((message, index) => (
          <ChatWin key={index} message={message} />
        ))}
        <div ref={messagesEndRef}></div>{' '}
        {/* Referencia para hacer scroll al final del contenedor de mensajes */}
      </div>
      <div className="chat-input-container">
        
      <IoDocumentAttach size={40} />
        <input
          type="text"
          className="chat-input"
          placeholder="Enter your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button className="chat-send-button" onClick={handleSubmit}>
        <FaCircleArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
