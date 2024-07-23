import { Request, Response, NextFunction } from "express";
import { ChatService } from "../services/Chat.service";
import { MessageCreateType } from "../utils/schema/chat.schema";
import { MongooseError } from "mongoose";

import { InternalServerError } from "../utils/errors/InternalServerError";

export class ChatController {
  private readonly chatService: ChatService;
  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }

  createMessage = async (req: Request, res: Response, next: NextFunction) => {
    const message: MessageCreateType = req.body;
    try {
      const { status, payload } = await this.chatService.createMessage(message);
      res.send({ status, payload });
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  findMessages = async (req: Request, res: Response, next: NextFunction) => {
    const { chatRoomId } = req.params;
    try {
      const { status, payload } = await this.chatService.findMessages(
        chatRoomId
      );
      res.send({ status, payload });
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
}
