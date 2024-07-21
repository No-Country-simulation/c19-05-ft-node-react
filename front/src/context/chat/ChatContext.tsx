/** @format */

import { createContext, useContext, useReducer, useState } from 'react';
import {
  reducer,
  initialState,
  ChatReducerType,
  ChatActionsReducer,
} from '@/reducers/chat-reducers';
import { Message, messageSend } from '@/types/chat.type';
import { getMessages, sendMessage } from '@/api/ChatAPI';
import supabase from '@/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';
import { handleError } from '@/utils/error.handler';

// que datos voy a pasar en el provider.
type ChatContextProps = {
  state: ChatReducerType;
  dispatch: React.Dispatch<ChatActionsReducer>;
  getMessagesContext: (id: string) => Promise<void>;
  sendMessageContext: (message: messageSend) => Promise<false | Message>;
  createChannelConnection: (tradeId: string) => Promise<void>;
  sendMessageSupabase: (message: Message) => Promise<void>;
  channelDisconnect: () => void;
};

// Hook personalizado para usar el contexto
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// le digo a createContext que tipos de datos voy a pasar
const ChatContext = createContext<ChatContextProps>({} as ChatContextProps);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [channelTrade, setChannelTrade] = useState<RealtimeChannel>();

  const createChannelConnection = async (tradeId: string) => {
    try {
      const channelTrade = supabase.channel(tradeId);
      console.log(channelTrade);

      await new Promise((resolve, reject) => {
        channelTrade.subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            resolve(status);
          } else {
            reject(new Error('Failed to subscribe'));
          }
        });
      });
      setChannelTrade(channelTrade);

      channelTrade.on(
        'broadcast',
        { event: 'my-event' },
        (payload: {
          event: string;
          payload: { message: Message };
          type: string;
        }) => {
          const { message } = payload.payload;
          dispatch({ type: 'setMessage', payload: message });
        }
      );
    } catch (error) {
      console.log('Error al suscribir al canal', error);
    }
  };

  const sendMessageSupabase = async (message: Message) => {
    try {
      if (channelTrade) {
        await channelTrade.send({
          type: 'broadcast',
          event: 'my-event',
          payload: { message },
        });
      }
    } catch (error) {
      console.error('Subscription failed or error occurred:', error);
    }
  };

  const channelDisconnect = () => {
    if (channelTrade) {
      supabase.removeChannel(channelTrade);
      return;
    }
  };

  const getMessagesContext = async (id: string) => {
    try {
      const { status, payload } = await getMessages(id);
      if (status) {
        dispatch({ type: 'getMessages', payload: payload });
      }
    } catch (error) {
      handleError(error);
    }
  };
  const sendMessageContext = async (message: messageSend) => {
    try {
      const { status, payload } = await sendMessage(message);
      if (status) {
        dispatch({ type: 'sendMessage', payload: payload });
        if (payload !== undefined) return payload;
      }
      return false;
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        state,
        dispatch,
        getMessagesContext,
        sendMessageContext,
        channelDisconnect,
        createChannelConnection,
        sendMessageSupabase,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// ChatContext.tsx
