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
      throw error;
    }
  }

  async find(id: Types.ObjectId | string): Promise<ITrade[]> {
    try {
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
      throw error;
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
      throw error;
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
      throw error;
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
        $or: [
          { "members.memberTwo.id": userId, status: status },
          { "members.memberOne.id": userId, status: status },
        ],
      })
        .populate({
          path: "members.memberOne.id",
          select: "name avatar email", // Selecciona los campos que quieres incluir
        })
        .populate({
          path: "members.memberOne.specialty",
          select: "name", // Selecciona los campos que quieres incluir
        })
        .populate({
          path: "members.memberTwo.id",
          select: "name avatar email", // Selecciona los campos que quieres incluir
        })
        .populate({
          path: "members.memberTwo.specialty",
          select: "name", // Selecciona los campos que quieres incluir
        });
      return trade;
    } catch (error) {
      throw error;
    }
  }

  async findOnePendingNoPopulate(
    userId: string | Types.ObjectId,
    tradeId: string | Types.ObjectId,
    status: enumTradeStatus | {}
  ): Promise<ITrade | null> {
    try {
      const trade = await this.TradeModel.findOne({
        _id: tradeId,
        $or: [
          { "members.memberTwo.id": userId, status: status },
          { "members.memberOne.id": userId, status: status },
        ],
      });

      return trade;
    } catch (error) {
      throw error;
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
      })
        .populate({
          path: "members.memberOne.id",
          select: "name avatar email", // Selecciona los campos que quieres incluir
        })
        .populate({
          path: "members.memberOne.specialty",
          select: "name", // Selecciona los campos que quieres incluir
        })
        .populate({
          path: "members.memberTwo.id",
          select: "name avatar email", // Selecciona los campos que quieres incluir
        })
        .populate({
          path: "members.memberTwo.specialty",
          select: "name", // Selecciona los campos que quieres incluir
        });
      return trade;
    } catch (error) {
      throw error;
    }
  }
  async findOneNoPopulated(
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
      });

      return trade;
    } catch (error) {
      throw error;
    }
  }

  async findTradesByIdPopulated(
    userId: string | Types.ObjectId
  ): Promise<ITrade[]> {
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
          select: "name email avatar",
        })
        .populate({
          path: "members.memberTwo.id",
          select: "name email avatar",
        })
        .populate("members.memberOne.specialty")
        .populate("members.memberTwo.specialty");
    } catch (error) {
      throw error;
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
      throw error;
    }
  }
  async updateFinished(id: string) {
    try {
      const trade = await this.TradeModel.findByIdAndUpdate(id, {
        status: "FINISHED",
      });
      return trade;
    } catch (error) {
      throw error;
    }
  }
}
