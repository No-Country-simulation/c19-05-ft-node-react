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
exports.authValidatePassportOptional = exports.authValidatePassport = exports.authValidate = void 0;
const jwt_config_1 = require("../utils/jwt/jwt.config");
const User_repository_1 = require("../repositories/User.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
const passport_1 = __importDefault(require("passport"));
const userRepository = new User_repository_1.UserRepository();
const authValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "no estas autorizado" });
    }
    else {
        try {
            const userId = (0, jwt_config_1.dataJwt)(token);
            if (!userId) {
                return res
                    .status(404)
                    .send({ error: "Hubo un error al autentificar el usuario." });
            }
            if (typeof userId === "object" && userId.id) {
                const user = yield userRepository.findOne(userId.id);
                if (!user) {
                    return res.status(500).json({ error: "Token no valido" });
                }
                req.user = user;
                return next();
            }
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.JsonWebTokenError ||
                error instanceof jsonwebtoken_1.TokenExpiredError ||
                error instanceof jsonwebtoken_1.NotBeforeError) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: "Error del servidor" });
            }
        }
    }
});
exports.authValidate = authValidate;
const authValidatePassport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('jwt', (error, user, info) => {
        if (error) {
            return res.status(401).send({
                status: 'error',
                message: 'Hubo un error al autenticar.',
                error: error.message
            });
        }
        if (!user) {
            return res.status(401).send({
                status: 'error',
                message: 'No se ha podido autenticar al usuario.',
            });
        }
        req.user = user;
        next();
    })(req, res, next);
});
exports.authValidatePassport = authValidatePassport;
const authValidatePassportOptional = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('jwt', (error, user, info) => {
        if (error || !user) {
            next();
        }
        req.user = user;
        next();
    })(req, res, next);
});
exports.authValidatePassportOptional = authValidatePassportOptional;
