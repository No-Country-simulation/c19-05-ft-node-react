import mongoose, { Document, Schema, Types } from "mongoose";

export interface IChat extends Document {
  userOne: Types.ObjectId;
  userTwo: Types.ObjectId;
  trade: Types.ObjectId;
  messages: Types.ObjectId[];
}

const ChatRoomSchema = new Schema({
  userOne: {
    type: Types.ObjectId,
    ref: "User",
  },
  userTwo: {
    type: Types.ObjectId,
    ref: "User",
  },
  tradeId: {
    type: Types.ObjectId,
    ref: "Trade",
  },
  messages: [
    {
      type: Types.ObjectId,
      ref: "Message",
      default: [],
    },
  ],
});

const Chat = mongoose.model<IChat>("Chat", ChatRoomSchema);

export default Chat;
