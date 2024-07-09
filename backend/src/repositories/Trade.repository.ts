import { Types } from "mongoose";
import Trade, { createTradeType, ITrade, membersType } from "../models/Trade.model";
import { UserRepository } from "./User.repository";






export class TradeRepository {
    
    constructor(private readonly TradeModel = Trade,) {

    }
    async create(trade:createTradeType) {
        try {
            const newTrade = await this.TradeModel.create(trade)
            return newTrade
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {
                throw new Error(error.message)
            }
			throw Error("Error al crear trade")
        }
    }


    async findOne (tradeId:string):Promise<ITrade | null> {
        try {
          
            return await this.TradeModel.findById(tradeId)
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {
                throw new Error(error.message)
            }
			throw Error("Error al buscar trade")
        }
    }

    async findTradesById(userId: string):Promise<ITrade[]> {
        try {

            const userObjectId = new Types.ObjectId(userId); 
    
            return await this.TradeModel.find({
                $or: [
                    { 'members.memberOne.id': userObjectId },
                    { 'members.memberTwo.id': userObjectId }
                ]
            })
            .populate({
                path: 'members.memberOne.id',
                select: 'name email'
            })
            .populate({
                path: 'members.memberTwo.id',
                select: 'name email'
            })
            .populate('members.memberOne.specialty')
            .populate('members.memberTwo.specialty');

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Error al buscar trades");
        }
    }
    async updateAccepted(id:string,date:Date) {
        try {
            const trade = await this.TradeModel.findByIdAndUpdate(id,{expiresAt:date, status:"ACCEPTED"})
            return trade;
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {
                throw new Error(error.message)
            }
			throw Error("Error al aceptar trade")
        }

    }
    async updateFinished(id:string) {
        try {
            const trade = await this.TradeModel.findByIdAndUpdate(id,{status:"FINISHED"})
            return trade;
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {
                throw new Error(error.message)
            }
			throw Error("Error al aceptar trade")
        }
    }

    async updateStatusHasRated(idTrade: Types.ObjectId, memberId: Types.ObjectId) {
        try {
            const updatedTrade = await this.TradeModel.findOneAndUpdate(
                {
                  _id: idTrade
                },
                {
                  $set: {
                    'members.$[elem].hasRated': true
                  }
                },
                {
                  new: true,
                  arrayFilters: [
                    { 'elem.id': memberId }
                  ]
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



    async delete(id:string) {
        try {
			return await this.TradeModel.findByIdAndDelete(id);
		} catch (error) {
			console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
			throw Error("Error al eliminar trade")
		}
    }
}