/** @format */

import { Message } from '@/types/chat.type';

export type ChatActionsReducer =
  | { type: 'getMessages'; payload: Message[] } // en esta accion recibo el id para traer todos los mensajes
  | { type: 'sendMessage'; payload: Message } // en esta accion voy a recibir el objeto para enviar mensaje
  | { type: 'setMessage'; payload: Message };

export type ChatReducerType = {
  messages: Message[]; // mi estado va a tener los mensajes
};

export const initialState: ChatReducerType = {
  messages: [], // mi estado va a tener los mensajes
};

// este es el reducer que luego utilizo en el useReducer dentro del context.
export const reducer = (
  state: ChatReducerType = initialState,
  action: ChatActionsReducer
) => {
  switch (action.type) {
    case 'getMessages':
      return {
        ...state,
        messages: action.payload,
      };
    case 'sendMessage':
      //El tipo "Message[] | null" debe tener un método "[Symbol.iterator]()" que devuelve un iterador.ts(2488) basicamente
      //si state.messages === null no puedo utilizar el spread operator asi que hago este if

      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case 'setMessage':
      //El tipo "Message[] | null" debe tener un método "[Symbol.iterator]()" que devuelve un iterador.ts(2488) basicamente
      //si state.messages === null no puedo utilizar el spread operator asi que hago este if

      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
};
