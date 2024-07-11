import { Types } from "mongoose";
import { TradeRepository } from "../repositories/Trade.repository";
import { UserRepository } from "../repositories/User.repository";
import { createTradeType, enumTradeStatus } from "../models/Trade.model";
import { IUser } from "../models/User.model";

export class TradeService {
    private readonly tradeRepository: TradeRepository;
    private readonly userRepository:UserRepository
    constructor( tradeRepository: TradeRepository,userRepository:UserRepository)
        {
         this.tradeRepository = tradeRepository,
         this.userRepository = userRepository;
        } 

    async create (trade:createTradeType,userOne:IUser) {
        try {
            // TODO: verificar que la especialidad del miembro que propone el trade coincida con el interés del que recibe la propuesta del trade
            // y viceversa.
            if(userOne.specialties.length === 0) {
                return {
                    status:"error",
                    payload:"No podes crear un trade sin especialidades en tu perfil."
                }
            }
           
            const trades = await this.tradeRepository.findOnePending(userOne._id)
            
            const isPossible = trades!.findIndex(trade => trade.members.memberOne.id.toString() === userOne._id.toString() || trade.members.memberTwo.id.toString() === userOne._id.toString() )

            if(isPossible !== -1) {
                return {
                    status:"error",
                    payload:"No podes crear un trade con este usuario. Hay un trade pendiente."
                }
            }
            const userTwo = await this.userRepository.findOne(trade.members.memberTwo.id)
            if(!userTwo ) {
                return {
                    status:"error",
                    payload:"Usuario no encontrado"
                }
            }
            //chequear que los intereses sean correspondientes
            const findIndexOneSpecialty = userOne.specialties.findIndex(specialty => specialty.specialtyId.toString() === trade.members.memberOne.specialty.toString())
            const findIndexOneInterest = userOne.interests.findIndex(interest => interest.specialtyId.toString() === trade.members.memberTwo.specialty.toString())

            if(findIndexOneSpecialty === -1 || findIndexOneInterest === -1) {
                return {
                    status:"error",
                    payload:"Los intereses no corresponden con las especialidades."
                }
            }
            const findIndexTwoSpecialty = userTwo.specialties.findIndex(specialty => specialty.specialtyId.toString() === trade.members.memberTwo.specialty.toString())
            const findIndexTwoInterest = userTwo.interests.findIndex(interest => interest.specialtyId.toString() === trade.members.memberOne.specialty.toString())

            if(findIndexTwoSpecialty === -1 || findIndexTwoInterest === -1) {
                return {
                    status:"error",
                    payload:"Los intereses no corresponden con las especialidades."
                }
            }
           
            const newTrade = await this.tradeRepository.create(trade);

            userOne.trades.push(newTrade.id)
            userTwo.trades.push(newTrade.id)

            const [uno,dos] = await Promise.allSettled([userTwo.save(),userOne.save()]); 
            return {
                status:"success",
                payload:newTrade
            }
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
            
        }
    }
    // trae todos los trades, chequea que no haya trades vencidos. en caso de haber los actualiza y los devuelve al front.
    async findTrades(userTrades:string[]) {
        try {
            const arrayTradesPromise = userTrades.map(trade => {
                    return this.tradeRepository.findOne(trade)
            })
            const arrayTradesResult = await Promise.all(arrayTradesPromise)
            const updateTrade = arrayTradesResult.map(trade => {
                if( trade && trade.expiresAt && trade.expiresAt < new Date() && trade.status === "ACCEPTED" ) {
                    trade.status = "FINISHED"
                    return trade.save()
                }else if(trade) {
                    return trade
                }
            })

            await Promise.allSettled(updateTrade);
            return updateTrade;

        } catch (error) {
            console.log(error)
            if(error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
        }
    }

    async findOne(tradeId:string) {
        try {
            return await this.tradeRepository.findOne(tradeId)
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
            throw new Error(String(error)) 
        }
    }

    async updateAccepted (tradeId:string) {
        try {
            const trade = await this.tradeRepository.findOne(tradeId)
            if(!trade) return {status:"error",payload:"trade no encontrado"}
            const duration = trade.duration;
            const expiresAt = new Date(new Date().getTime() + duration)
            const tradeUpdated = await this.tradeRepository.updateAccepted(tradeId,expiresAt)
            return {status:"success",payload:tradeUpdated}
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
        }
    }

    async updateHasRated (tradeId:Types.ObjectId,userId:Types.ObjectId) {
        try {
            return await this.tradeRepository.updateStatusHasRated(tradeId,userId)
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
            throw new Error(String(error))
        }
    }

    async deleteTrade (tradeId:string) {
        try {
            const trade  = await this.tradeRepository.findOne(tradeId);
            if(!trade) return {status:"error",payload:"El trade no existe"}

            if(trade.status === "PENDING") {
                await trade.deleteOne()
                return {status:"succes",payload:"trade eliminado"}
            }
        } catch (error) {
            
        }
    }

}