import { Request, Response } from "express";
import { ChatService } from "../services/Chat.service";
import { MessageCreateType } from "../utils/schema/chat.schema";
import { MongooseError } from "mongoose";

export class ChatController {
  private readonly chatService: ChatService;
  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }

  createMessage = async (req: Request, res: Response) => {
    const message: MessageCreateType = req.body;
    try {
      const { status, payload } = await this.chatService.createMessage(message);

      status
        ? res.send({ status, payload })
        : res.status(403).send({ status, payload });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ status: false, payload: error.message });
      } else if (error instanceof MongooseError) {
        res.status(400).send({ status: false, payload: error.message });
      }
      res.status(500).send({ status: false, payload: "Error interno" });
    }
  };

  findMessages = async (req: Request, res: Response) => {
    const { chatRoomId } = req.params;
    try {
      const { status, payload } = await this.chatService.findMessages(
        chatRoomId
      );
      status
        ? res.send({ status, payload })
        : res.status(404).send({ status, payload });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ status: false, payload: error.message });
      } else if (error instanceof MongooseError) {
        res.status(400).send({ status: false, payload: error.message });
      }
      res.status(500).send({ status: false, payload: "Error interno" });
    }
  };
}
