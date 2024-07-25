import { Router } from "express";
import { authValidatePassport } from "../middlewares/authValidate";
import { TradeController } from "../controllers/Trade.controller";
import { TradeService } from "../services/Trade.service";
import { TradeRepository } from "../repositories/Trade.repository";
import { UserRepository } from "../repositories/User.repository";
import { middlewareBody } from "../middlewares/validateBody";
import { TradeSchema } from "../utils/schema/trade.schema";
import { middlewareParamsObjectId } from "../middlewares/validateParamObjectId";
import router from "./index.routes";

const userRepository = new UserRepository();
const tradeRepository = new TradeRepository();
const tradeService = new TradeService(tradeRepository, userRepository);
const tradeController = new TradeController(tradeService);

const routerTrade = Router();

routerTrade.param("tradeId", middlewareParamsObjectId("tradeId"));

routerTrade.post(
  "/trade",
  authValidatePassport,
  middlewareBody(TradeSchema),
  tradeController.create
);
routerTrade.put(
  "/trade/:tradeId",
  authValidatePassport,
  tradeController.updateAccepted
);
routerTrade.delete(
  "/trade/:tradeId",
  authValidatePassport,
  tradeController.delete
);
routerTrade.get(
  "/trade/find-one/:tradeId",
  authValidatePassport,
  tradeController.findOne
);
routerTrade.get("/trade/", authValidatePassport, tradeController.findTrades);

export default routerTrade;
