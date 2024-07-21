import { z } from 'zod';

const SenderReceiverInfoSchema = z.object({
  avatar: z.string(),
  _id: z.string(),
  name: z.string(),
});

export const GetMessagesSchema = z.object({
  status: z.string(),
  payload: z.array(
    z.object({
      _id: z.string(),
      senderId: SenderReceiverInfoSchema,
      receiverId: SenderReceiverInfoSchema,
      message: z.string(),
      chatRoomId: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      __v: z.number(),
    })
  ),
});

export const SendMessageResponseSchema = z.object({
  status: z.string(),
  payload: z.object({
    _id: z.string(),
    senderId: SenderReceiverInfoSchema,
    receiverId: SenderReceiverInfoSchema,
    message: z.string(),
    chatRoomId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
  }),
});

export type ResponseSendMessage = {
  status: boolean;
  payload: Message;
};

export type messageSend = Pick<
  SendMessage,
  'senderId' | 'receiverId' | 'message' | 'chatRoomId'
>;

export type SendMessage = {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  chatRoomId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface GetMessages {
  status: boolean;
  payload: Message[];
}

export type Message = {
  _id: string;
  senderId: SenderReceiverInfo;
  receiverId: SenderReceiverInfo;
  message: string;
  chatRoomId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface SenderReceiverInfo {
  avatar: string;
  _id: string;
  name: string;
}
