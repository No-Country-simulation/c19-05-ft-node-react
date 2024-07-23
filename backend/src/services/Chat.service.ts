import { Types } from "mongoose";

import { ChatRepository } from "../repositories/Chat.repository";
import { UserRepository } from "../repositories/User.repository";
import { MessageCreateType } from "../utils/schema/chat.schema";

import { BadRequestError } from "../utils/errors/BadRequestError";
import { DatabaseError } from "../utils/errors/DatabaseError";

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
        throw new BadRequestError("The information provided is incorrect.");
      }

      const newMessage = await this.chatRepository.createMessage(message);
      if (!newMessage) {
        throw new DatabaseError();
      }

      return {
        status: "sucess",
        payload: newMessage,
      };
    } catch (error) {
      throw error;
    }
  }

  async findMessages(id: string | Types.ObjectId) {
    try {
      const chatRoom = await this.chatRepository.findChatRoom(id);
      if (!chatRoom) {
        throw new BadRequestError("The chat room does not exist.");
      }

      const messages = await this.chatRepository.findMessages(id);
      return {
        status: "sucess",
        payload: messages,
      };
    } catch (error) {
      throw error;
    }
  }
}
