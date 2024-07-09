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
exports.AuthService = void 0;
const bcrypt_config_1 = require("../utils/bcrypt/bcrypt.config");
const jwt_config_1 = require("../utils/jwt/jwt.config");
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByEmail(data.email);
                if (!user) {
                    return {
                        status: "error",
                        payload: "User not found"
                    };
                }
                const isValid = yield (0, bcrypt_config_1.comparePassword)(data.password, user.password);
                if (!isValid) {
                    return {
                        status: "error",
                        payload: "Incorrect password"
                    };
                }
                const token = (0, jwt_config_1.generateJWT)({ id: user.id });
                return {
                    status: "success",
                    payload: token
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
}
exports.AuthService = AuthService;
