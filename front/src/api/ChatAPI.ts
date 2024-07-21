/** @format */

import api from '@/lib/axios';
import {
  GetMessages,
  GetMessagesSchema,
  ResponseSendMessage,
  SendMessageResponseSchema,
  messageSend,
} from '@/types/chat.type';
import { handleError } from '@/utils/error.handler';

export async function getMessages(id: string) {
  try {
    const { data } = await api.get<GetMessages>(`api/chat/${id}`);
    console.log(data);

    const result = GetMessagesSchema.safeParse(data);
    console.log(result);

    if (result.success) {
      return result.data;
    } else {
      throw new Error('Ocurrio un error en el parseo de data');
    }
  } catch (error) {
    handleError(error);
  }
}

export async function sendMessage(message: messageSend) {
  try {
    const { data } = await api.post<ResponseSendMessage>(
      `api/chat/create-message`,
      message
    );
    const result = SendMessageResponseSchema.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      throw new Error('Ocurrio un error en el parseo de data');
    }
  } catch (error) {
    handleError(error);
  }
}
