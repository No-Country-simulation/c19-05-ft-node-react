import { Router } from "express";

import { ChatController } from "../controllers/Chat.controller";
import { ChatService } from "../services/Chat.service";
import { Message } from "../models/Message";
import Chat from "../models/ChatRoom";
import UserModel from "../models/User.model";
import { ChatRepository } from "../repositories/Chat.repository";
import { UserRepository } from "../repositories/User.repository";
import { authValidatePassport } from "../middlewares/authValidate";
import { middlewareParamsObjectId } from "../middlewares/validateParamObjectId";
import { middlewareBody } from "../middlewares/validateBody";
import { CreateMessageSchema } from "../utils/schema/chat.schema";

const routerChat = Router();

const chatRepository = new ChatRepository(Message, Chat);
const userRepository = new UserRepository(UserModel);
const chatService = new ChatService(chatRepository, userRepository);
const chatController = new ChatController(chatService);

routerChat.param("chatRoomId", middlewareParamsObjectId("chatRoomId"));
routerChat.post(
  "/chat/create-message",
  authValidatePassport,
  middlewareBody(CreateMessageSchema),
  chatController.createMessage
);
routerChat.get(
  "/chat/:chatRoomId",
  authValidatePassport,
  chatController.findMessages
);

export default routerChat;
