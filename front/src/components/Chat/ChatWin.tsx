import React from 'react';

import { formatTime } from '@/utils/format.hour';
import { Message } from '@/types/chat.type';
import { useAuth } from '@/context/session/sessionContext';

type ChatWinProps = {
  message: Message;
};

export default function ChatWin({ message }: ChatWinProps) {
  const { user } = useAuth();
  if (user) {
    const senderId = message.senderId._id === user._id;
    const chatPositionClass = senderId ? 'ml-auto' : 'mr-auto'; // Determina la clase de posición según senderId

    return (
      <div className={`w-[90%] mb-4 ${chatPositionClass}`}>
        <div
          className={`flex rounded-md justify-${senderId ? 'end' : 'start'} relative`}
        >
          <p className="pt-2 pl-2 rounded-xl chat-message">{message.message}</p>
          <span className="absolute bottom-[-10px] text-sm">
            {formatTime(message.createdAt)}
          </span>
        </div>
      </div>
    );
  }
}
