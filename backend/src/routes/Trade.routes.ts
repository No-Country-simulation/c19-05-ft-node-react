import { Router } from "express";
import { authValidatePassport } from "../middlewares/authValidate";
import { TradeController } from "../controllers/Trade.controller";
import { TradeService } from "../services/Trade.service";
import { TradeRepository } from "../repositories/Trade.repository";
import { UserRepository } from "../repositories/User.repository";
import { middlewareBody } from "../middlewares/validateBody";
import { TradeSchema } from "../utils/schema/trade.schema";

const userRepository = new UserRepository()
const tradeRepository = new TradeRepository()
const tradeService = new TradeService(tradeRepository,userRepository)
const tradeController = new TradeController(tradeService)

const routerTrade = Router();



routerTrade.post("/trade",middlewareBody(TradeSchema) ,authValidatePassport,tradeController.create)




export default routerTrade;