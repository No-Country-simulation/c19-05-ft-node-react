"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeService = void 0;
class TradeService {
    constructor(tradeRepository, userRepository) {
        this.tradeRepository = tradeRepository,
            this.userRepository = userRepository;
    }
    create(trade) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [memberOne, memberTwo] = yield Promise.all([this.userRepository.findOne(trade.members.memberOne.id), this.userRepository.findOne(trade.members.memberTwo.id)]);
                if (!memberOne || !memberTwo) {
                    return {
                        status: "error",
                        payload: "Usuario no encontrado"
                    };
                }
                const newTrade = yield this.tradeRepository.create(trade);
                memberOne === null || memberOne === void 0 ? void 0 : memberOne.trades.push(newTrade.id);
                memberTwo === null || memberTwo === void 0 ? void 0 : memberTwo.trades.push(newTrade.id);
                yield Promise.allSettled([memberOne.save(), memberTwo.save()]);
                return {
                    status: "success",
                    payload: newTrade
                };
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
    // trae todos los trades, chequea que no haya trades vencidos. en caso de haber los actualiza y los devuelve al front.
    findTrades(userTrades) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const arrayTradesPromise = userTrades.map(trade => {
                    return this.tradeRepository.findOne(trade);
                });
                const arrayTradesResult = yield Promise.all(arrayTradesPromise);
                const updateTrade = arrayTradesResult.map(trade => {
                    if (trade && trade.expiresAt < new Date() && trade.status === "ACCEPTED") {
                        trade.status = "FINISHED";
                        return trade.save();
                    }
                    else if (trade) {
                        return trade;
                    }
                });
                yield Promise.allSettled(updateTrade);
                return updateTrade;
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
    updateAccepted(tradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trade = yield this.tradeRepository.findOne(tradeId);
                if (!trade)
                    return { status: "error", payload: "trade no encontrado" };
                const duration = trade.duration;
                const expiresAt = new Date(new Date().getTime() + duration);
                const tradeUpdated = yield this.tradeRepository.updateAccepted(tradeId, expiresAt);
                return { status: "success", payload: tradeUpdated };
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw new Error(String(error));
            }
        });
    }
    updateHasRated() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.TradeService = TradeService;
