import { MongooseError, Types } from "mongoose";
import Trade, {
  createTradeType,
  enumTradeStatus,
  ITrade,
} from "../models/Trade.model";

export class TradeRepository {
  constructor(private readonly TradeModel = Trade) {}

  async create(trade: createTradeType) {
    try {
      const newTrade = new this.TradeModel(trade);
      return await newTrade.save();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error("Error al crear trade");
    }
  }

  async find(id: Types.ObjectId | string): Promise<ITrade[]> {
    try {
      console.log(id);

      const trades = await this.TradeModel.find({
        $or: [{ "members.memberOne.id": id }, { "members.memberTwo.id": id }],
      })
        .populate({ path: "members.memberOne.id", select: "name email avatar" })
        .populate({
          path: "members.memberTwo.id",
          select: "name email avatar",
        });
      return trades;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else if (error instanceof MongooseError) {
        throw new Error(error.message);
      } else {
        throw new Error("Ocurrio un error al crear usuario");
      }
    }
  }

  async findTradesByIdTwoMembers(
    userOne: string | Types.ObjectId,
    userTwo: string | Types.ObjectId,
    status: { status: enumTradeStatus } | {}
  ): Promise<ITrade[]> {
    try {
      const trades = await this.TradeModel.find({
        $and: [
          {
            $or: [
              {
                "members.memberOne.id": userOne,
                "members.memberTwo.id": userTwo,
              },
              {
                "members.memberOne.id": userTwo,
                "members.memberTwo.id": userOne,
              },
            ],
          },
          { status: status },
        ],
      }).select("members duration status expiresAt chatRoom");

      return trades;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error("Error al buscar trade");
    }
  }

  async findTradesById(userId: string | Types.ObjectId): Promise<ITrade[]> {
    try {
      const trades = await this.TradeModel.find({
        $or: [
          { "members.memberOne.id": userId },
          { "members.memberTwo.id": userId },
        ],
      }).select("members duration status expiresAt chatRoom");
      return trades;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error("Error al buscar trade");
    }
  }

  async findOnePending(
    userId: string | Types.ObjectId,
    tradeId: string | Types.ObjectId,
    status: enumTradeStatus | {}
  ): Promise<ITrade | null> {
    try {
      const trade = await this.TradeModel.findOne({
        _id: tradeId,
        $or: [{ "members.memberTwo.id": userId, status: status }],
      }).select("members duration status expiresAt chatRoom");
      return trade;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error("Error al buscar trade");
    }
  }

  async findOne(
    userId: string | Types.ObjectId,
    tradeId: string | Types.ObjectId
  ): Promise<ITrade | null> {
    try {
      const trade = await this.TradeModel.findOne({
        _id: tradeId,
        $or: [
          { "members.memberOne.id": userId },
          { "members.memberTwo.id": userId },
        ],
      }).select("members duration status expiresAt chatRoom");
      return trade;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error("Error al buscar trade");
    }
  }

  async findTradesByIdPopulated(userId: string): Promise<ITrade[]> {
    try {
      const userObjectId = new Types.ObjectId(userId);

      return await this.TradeModel.find({
        $or: [
          { "members.memberOne.id": userObjectId },
          { "members.memberTwo.id": userObjectId },
        ],
      })
        .populate({
          path: "members.memberOne.id",
          select: "name email",
        })
        .populate({
          path: "members.memberTwo.id",
          select: "name email",
        })
        .populate("members.memberOne.specialty")
        .populate("members.memberTwo.specialty");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error al buscar trades");
    }
  }
  async updateAccepted(id: string, date: Date) {
    try {
      const trade = await this.TradeModel.findByIdAndUpdate(id, {
        expiresAt: date,
        status: "ACCEPTED",
      });
      return trade;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error("Error al aceptar trade");
    }
  }
  async updateFinished(id: string) {
    try {
      const trade = await this.TradeModel.findByIdAndUpdate(id, {
        status: "FINISHED",
      });
      return trade;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw Error("Error al aceptar trade");
    }
  }

  async updateStatusHasRated(
    tradeId: Types.ObjectId,
    memberId: Types.ObjectId
  ) {
    try {
      const updatedTrade = await this.TradeModel.findOneAndUpdate(
        {
          _id: tradeId,
        },
        {
          $set: {
            "members.$[elem].hasRated": true,
          },
        },
        {
          new: true,
          arrayFilters: [{ "elem.id": memberId }],
        }
      );

      return updatedTrade;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error al aceptar trade");
    }
  }
}
