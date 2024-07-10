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
exports.strategyJWT = void 0;
const passport_jwt_1 = require("passport-jwt");
const env_config_1 = require("../../envs/env.config");
const User_repository_1 = require("../../../repositories/User.repository");
const userRepo = new User_repository_1.UserRepository();
const cookieExtractor = (req) => {
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
        const cookies = cookieHeader.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'token') {
                return value;
            }
        }
    }
    const token = req.cookies ? req.cookies.jwt : null;
    return token;
};
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: env_config_1.envs.JWT_SECRET
};
exports.strategyJWT = new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepo.findOne(payload.id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
}));
