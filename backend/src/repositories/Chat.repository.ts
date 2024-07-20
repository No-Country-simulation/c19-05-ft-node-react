import { Model, MongooseError, Types } from "mongoose";
import { IMessage } from "../models/Message";
import { IChat } from "../models/ChatRoom";
import { MessageCreateType } from "../utils/schema/chat.schema";

export class ChatRepository {
  private readonly messageModel: Model<IMessage>;
  private readonly chatModel: Model<IChat>;

  constructor(messageModel: Model<IMessage>, chatModel: Model<IChat>) {
    this.messageModel = messageModel;
    this.chatModel = chatModel;
  }
  async findMessages(id: string | Types.ObjectId): Promise<IMessage[] | []> {
    try {
      const response = await this.messageModel
        .find({ chatRoomId: id })
        .populate({ path: "senderId", select: "name avatar" })
        .populate({ path: "receiverId", select: "name avatar" });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else if (error instanceof MongooseError) {
        throw new Error(error.message);
      } else {
        throw new Error("Ocurrio un error al buscar mensajes");
      }
    }
  }

  async findMessage(id: string | Types.ObjectId): Promise<IMessage | null> {
    try {
      const response = await this.messageModel
        .findById(id)
        .populate({ path: "senderId", select: "name avatar" })
        .populate({ path: "receiverId", select: "name avatar" });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else if (error instanceof MongooseError) {
        throw new Error(error.message);
      } else {
        throw new Error("Ocurrio un error al buscar mensajes");
      }
    }
  }

  async createMessage(message: MessageCreateType): Promise<IMessage | null> {
    try {
      const newMessage = new this.messageModel(message);
      await newMessage.save();
      const populatedMessage = await this.findMessage(newMessage.id);
      return populatedMessage;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else if (error instanceof MongooseError) {
        throw new Error(error.message);
      } else {
        throw new Error("Ocurrio un error al crear un mensaje");
      }
    }
  }
  async findChatRoom(id: string | Types.ObjectId): Promise<IChat | null> {
    try {
      return await this.chatModel.findById(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else if (error instanceof MongooseError) {
        throw new Error(error.message);
      } else {
        throw new Error("Ocurrio un error al buscar un chat room");
      }
    }
  }
}
