/** @format */

import mongoose, { Document, Schema, Types } from "mongoose";
import UserModel from "./User.model";
import Chat from "./ChatRoom";

type memberType = {
  id: string;
  specialty: string;
  hasRated: boolean;
};

export type membersType = {
  memberOne: memberType;
  memberTwo: memberType;
};

export type createTradeType = { members: membersType; duration: number };
const tradeStatus = {
  accepted: "ACCEPTED",
  pending: "PENDING",
  finished: "FINISHED",
} as const;

export type enumTradeStatus = (typeof tradeStatus)[keyof typeof tradeStatus];

export interface ITrade extends Document {
  id: Types.ObjectId;
  members: membersType & Document;
  duration: number;
  expiresAt: Date | null;
  status: enumTradeStatus;
  chatRoom: Types.ObjectId[];
}

const TradeSchema: Schema = new Schema({
  members: {
    type: {
      memberOne: {
        id: {
          type: Types.ObjectId,
          ref: "User",
        },
        specialty: {
          type: Types.ObjectId,
          ref: "Specialty",
        },
        hasRated: {
          type: Boolean,
          default: false,
        },
      },
      memberTwo: {
        id: {
          type: Types.ObjectId,
          ref: "User",
        },
        specialty: {
          type: Types.ObjectId,
          ref: "Specialty",
        },
        hasRated: {
          type: Boolean,
          default: false,
        },
      },
    },
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ["ACCEPTED", "PENDING", "FINISHED"],
    default: "PENDING",
  },
  chatRoom: {
    type: Types.ObjectId,
    ref: "Chat",
    default: null,
  },
});

TradeSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const trade = await Trade.findOne({ id: this.id });
      const [memberOne, memberTwo] = await Promise.all([
        UserModel.findById(trade!.members.memberOne),
        UserModel.findById(trade!.members.memberTwo),
      ]);
      memberOne!.trades = memberOne!.trades.filter(
        (trade) => trade?.toString() !== this.id.toString()
      );
      memberTwo!.trades = memberTwo!.trades.filter(
        (trade) => trade?.toString() !== this.id.toString()
      );
      await Promise.allSettled([memberOne!.save(), memberTwo!.save()]);
      next();
    } catch (error) {
      console.log("error borrando el proyecto y sus derivados.");
      next();
    }
  }
);

TradeSchema.pre("save", async function (next) {
  try {
    const trade = this as unknown as ITrade;

    const chat = new Chat({
      userOne: trade.members.memberOne.id,
      userTwo: trade.members.memberTwo.id,
      tradeId: trade.id,
    });

    const [userOne, userTwo] = await Promise.all([
      UserModel.findById(trade.members.memberOne.id),
      UserModel.findById(trade.members.memberTwo.id),
    ]);
    userOne!.chatRoom.push(chat.id);
    userTwo!.chatRoom.push(chat.id);
    userOne!.trades.push(trade.id);
    userTwo!.trades.push(trade.id);
    this.chatRoom = chat.id;
    await Promise.all([chat.save(), userOne?.save(), userTwo?.save()]);
    next();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
});

const Trade = mongoose.model<ITrade>("Trade", TradeSchema);

export default Trade;
