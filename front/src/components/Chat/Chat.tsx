import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import './style.css';
import ChatWin from './ChatWin';

export type Message = {
  content: string;
  date: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Previene el comportamiento por defecto del Enter
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    if (newMessage.length > 0) {
      const data = {
        content: newMessage,
        date: new Date().toString(),
      };
      setMessages([...messages, data]);
      setNewMessage('');
    }
  };
  return (
    <div className="div-container-chat">
      <div className="chat-container">
        {messages.length > 0 &&
          messages.map((message) => <ChatWin message={message} />)}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button className="chat-send-button" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </div>
  );
}
