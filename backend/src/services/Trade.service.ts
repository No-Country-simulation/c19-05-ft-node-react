/** @format */

import { Types } from "mongoose";
import { TradeRepository } from "../repositories/Trade.repository";
import { UserRepository } from "../repositories/User.repository";
import { createTradeType, enumTradeStatus } from "../models/Trade.model";
import { IUser } from "../models/User.model";

import { BadRequestError } from "../utils/errors/BadRequestError";

export class TradeService {
  private readonly tradeRepository: TradeRepository;
  private readonly userRepository: UserRepository;
  constructor(
    tradeRepository: TradeRepository,
    userRepository: UserRepository
  ) {
    (this.tradeRepository = tradeRepository),
      (this.userRepository = userRepository);
  }

  //ta ok👍
  async create(trade: createTradeType, userOne: IUser) {
    try {
      // TODO: verificar que la especialidad del miembro que propone el trade coincida con el interés del que recibe la propuesta del trade
      // y viceversa.
      if (userOne.specialties.length === 0) {
        throw new BadRequestError(
          "You cannot create a trade without specialties in your profile."
        );
      }
      const userTwo = await this.userRepository.findOne(
        trade.members.memberTwo.id
      );
      if (!userTwo) {
        throw new BadRequestError("The user does not exist.");
      }
      const trades = await this.tradeRepository.findTradesByIdTwoMembers(
        userOne._id,
        trade.members.memberTwo.id,
        "PENDING"
      );
      if (trades?.length > 0) {
        throw new BadRequestError(
          "You already have a pending trade with this user"
        );
      }
      // chequear que los intereses sean correspondientes
      const findIndexOneSpecialty = userOne.specialties.findIndex(
        (specialty) =>
          specialty.specialtyId._id.toString() ===
          trade.members.memberOne.specialty.toString()
      );
      // const findIndexOneInterest = userOne.interests.findIndex(
      //   (interest) =>
      //     interest.specialtyId._id.toString() ===
      //     trade.members.memberTwo.specialty.toString()
      // );
      if (findIndexOneSpecialty === -1) {
        throw new BadRequestError(
          "The interests do not match the specialties."
        );
      }
      //user two's specialty has to be compatible with member two's specialty
      const findIndexTwoSpecialty = userTwo.specialties.findIndex(
        (specialty) =>
          specialty.specialtyId.toString() ===
          trade.members.memberTwo.specialty.toString()
      );

      // user two's interest has to be compatible with user two's expertise
      const findIndexTwoInterest = userTwo.interests.findIndex(
        (interest) =>
          interest.specialtyId.toString() ===
          trade.members.memberOne.specialty.toString()
      );
      if (findIndexTwoSpecialty === -1 || findIndexTwoInterest === -1) {
        throw new BadRequestError(
          "The interests do not match the specialties."
        );
      }
      const newTrade = await this.tradeRepository.create(trade);
      userOne.trades.push(newTrade.id);
      userTwo.trades.push(newTrade.id);
      const [uno, dos] = await Promise.allSettled([
        userTwo.save(),
        userOne.save(),
      ]);
      return {
        status: "success",
        payload: newTrade,
      };
    } catch (error) {
      throw error;
    }
  }

  // trae todos los trades, chequea que no haya trades vencidos. en caso de haber los actualiza y los devuelve al front.
  //ta ok👍
  async findTrades(userId: string | Types.ObjectId) {
    try {
      const trades = await this.tradeRepository.findTradesByIdPopulated(userId);
      if (!trades) {
        return { status: "error", payload: "No hay trades" };
      }
      const updateTrade = trades.map((trade) => {
        if (trade.status === "ACCEPTED" && trade.expiresAt! < new Date()) {
          trade.status = "FINISHED";
          return trade.save();
        } else if (trade) {
          return trade;
        }
      });
      const update = await Promise.all(updateTrade);

      return { status: "success", payload: update };
    } catch (error) {
      throw error;
    }
  }

  async findOne(user: IUser, tradeId: string) {
    try {
      const trade = await this.tradeRepository.findOne(user._id, tradeId);

      if (!trade) {
        throw new BadRequestError("The trade does not exist.");
      }
      return {
        status: "success",
        payload: trade,
      };
    } catch (error) {
      throw error;
    }
  }

  //ta ok👍
  async updateAccepted(user: IUser, tradeId: string) {
    try {
      const tradeFound = await this.tradeRepository.findOnePendingNoPopulate(
        user._id,
        tradeId,
        "PENDING"
      );

      if (!tradeFound) {
        throw new BadRequestError("The trade does not exist.");
      }

      if (tradeFound.members.memberOne.id.toString() === user._id.toString()) {
        throw new BadRequestError(
          "You cannot accept a trade that you created yourself."
        );
      }
      const trade = await this.tradeRepository.findOnePending(
        user._id,
        tradeId,
        "PENDING"
      );
      const duration = trade!.duration;
      trade!.expiresAt = new Date(new Date().getTime() + duration);
      trade!.status = "ACCEPTED";
      await trade!.save();
      return { status: "success", payload: trade };
    } catch (error) {
      throw error;
    }
  }

  async deleteTrade(user: IUser, tradeId: string) {
    try {
      const trade = await this.tradeRepository.find(user._id);

      if (trade.length === 0) {
        throw new BadRequestError("The trade does not exist.");
      }

      const tradeDelete = trade.filter(
        (tr) => tr.id.toString() === tradeId.toString()
      );
      if (tradeDelete[0].status === "PENDING") {
        await tradeDelete[0].deleteOne();
        return { status: "success", payload: tradeDelete[0] };
      }
      throw new BadRequestError(
        `No trade with ID ${tradeId} found in pending status.`
      );
    } catch (error) {
      throw error;
    }
  }
}
