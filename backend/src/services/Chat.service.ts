import { MongooseError, Types } from "mongoose";

import { ChatRepository } from "../repositories/Chat.repository";
import { UserRepository } from "../repositories/User.repository";
import { MessageCreateType } from "../utils/schema/chat.schema";

export class ChatService {
  private readonly chatRepository: ChatRepository;
  private readonly userRepository: UserRepository;

  constructor(chatRepository: ChatRepository, userRepository: UserRepository) {
    this.chatRepository = chatRepository;
    this.userRepository = userRepository;
  }

  async createMessage(message: MessageCreateType) {
    try {
      const [chatRoom, receiver] = await Promise.all([
        this.userRepository.findOne(message.receiverId),
        this.chatRepository.findChatRoom(message.chatRoomId),
      ]);

      if (!chatRoom || !receiver) {
        return {
          status: "error",
          payload: "Los datos ingresados no son validos.",
        };
      } else {
        const newMessage = await this.chatRepository.createMessage(message);

        if (!newMessage) {
          return {
            status: "error",
            payload: "No se pudo crear el mensaje",
          };
        } else {
          return {
            status: "sucess",
            payload: newMessage,
          };
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(String(error));
    }
  }

  async findMessages(id: string | Types.ObjectId) {
    try {
      const chatRoom = await this.chatRepository.findChatRoom(id);
      if (!chatRoom) {
        return {
          status: "error",
          payload: "No existe la sala de chat ingresada",
        };
      } else {
        const messages = await this.chatRepository.findMessages(id);
        return {
          status: "sucess",
          payload: messages,
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else if (error instanceof MongooseError) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error));
      }
    }
  }
}
