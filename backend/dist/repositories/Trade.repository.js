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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeRepository = void 0;
const mongoose_1 = require("mongoose");
const Trade_model_1 = __importDefault(require("../models/Trade.model"));
class TradeRepository {
    constructor(TradeModel = Trade_model_1.default) {
        this.TradeModel = TradeModel;
    }
    create(trade) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTrade = yield this.TradeModel.create(trade);
                return newTrade;
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw Error("Error al crear trade");
            }
        });
    }
    findOne(tradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.TradeModel.findById(tradeId);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw Error("Error al buscar trade");
            }
        });
    }
    findTradesById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userObjectId = new mongoose_1.Types.ObjectId(userId);
                return yield this.TradeModel.find({
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
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error("Error al buscar trades");
            }
        });
    }
    updateAccepted(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trade = yield this.TradeModel.findByIdAndUpdate(id, { expiresAt: date, status: "ACCEPTED" });
                return trade;
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw Error("Error al aceptar trade");
            }
        });
    }
    updateFinished(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trade = yield this.TradeModel.findByIdAndUpdate(id, { status: "FINISHED" });
                return trade;
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw Error("Error al aceptar trade");
            }
        });
    }
    updateStatusHasRated(idTrade, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTrade = yield this.TradeModel.findOneAndUpdate({
                    _id: idTrade
                }, {
                    $set: {
                        'members.$[elem].hasRated': true
                    }
                }, {
                    new: true,
                    arrayFilters: [
                        { 'elem.id': memberId }
                    ]
                });
                return updatedTrade;
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw new Error("Error al aceptar trade");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.TradeModel.findByIdAndDelete(id);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw Error("Error al eliminar trade");
            }
        });
    }
}
exports.TradeRepository = TradeRepository;
