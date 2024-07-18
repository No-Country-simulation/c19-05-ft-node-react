/** @format */

import mongoose, {
  Document,
  PopulatedDoc,
  Schema,
  Types,
  mongo,
} from "mongoose";
import UserModel from "./User.model";

type memberType = {
  id: string;
  specialty: string;
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
});

const Trade = mongoose.model<ITrade>("Trade", TradeSchema);

TradeSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      console.log(this);
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

export default Trade;
