import React from 'react';
import { Message } from './Chat';
import { formatTime } from '@/utils/format.hour';

type ChatWinProps = {
  message: Message;
};

export default function ChatWin({ message }: ChatWinProps) {
  return (
    <div className="w-[90%] ml-auto mb-4">
      <div className="flex rounded-md justify-end relative">
        <p className="pt-2 pl-2 rounded-xl  chat-message">{message.content}</p>
        <span className="absolute bottom-[-10px] text-sm">
          {formatTime(message.date)}
        </span>
      </div>
    </div>
  );
}
