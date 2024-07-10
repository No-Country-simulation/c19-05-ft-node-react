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
exports.UserRepository = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
class UserRepository {
    constructor(UserModel = User_model_1.default) {
        this.UserModel = UserModel;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.UserModel.create(data);
                return user;
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                throw Error("Error al crear usuario");
            }
        });
    }
    find(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.UserModel.paginate(query, options);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.UserModel.findById(id)
                    .select("_id name email description phoneNumber specialties interests userRatings trades contacts")
                    .populate({ path: "trades", select: "_id status members expiresAt" })
                    .populate("specialties")
                    .populate("contacts");
                return result;
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw Error("Error al buscar un usuario");
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.UserModel.findOne({ email }).select("_id name email description password phoneNumber specialties interests userRatings trades contacts");
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw Error("Error al buscar un usuario por email");
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.UserModel.findByIdAndUpdate(id, data, { new: true });
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw Error("Error al actualizar un usuario");
            }
        });
    }
    updateByEmail(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.UserModel.findOneAndUpdate({ email }, data, { new: true });
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw Error("Error al actualizar un usuario");
            }
        });
    }
    updateRating(data) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.UserModel.findByIdAndDelete(id);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                throw Error("Error al eliminar un usuario");
            }
        });
    }
}
exports.UserRepository = UserRepository;
