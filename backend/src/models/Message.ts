import mongoose, { Document, Schema, Types } from "mongoose";
import Chat from "./ChatRoom";

export interface IMessage extends Document {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  chatRoomId: Types.ObjectId;
}

const MessageSchema = new Schema(
  {
    senderId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    chatRoomId: {
      type: Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

MessageSchema.pre("save", async function (next) {
  try {
    const message = this as IMessage;
    // const chat = await Chat.findById(message.chatRoomId);
    // chat?.messages.push(message._id)
    await Chat.findByIdAndUpdate(message.chatRoomId, {
      $push: { messages: message.id },
    });
    next();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
});
const Message = mongoose.model<IMessage>("Message", MessageSchema);

export { Message };
