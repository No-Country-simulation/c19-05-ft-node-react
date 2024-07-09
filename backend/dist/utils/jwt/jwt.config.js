"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataEmailJwt = exports.dataRegisterJwt = exports.dataJwt = exports.generateJWTRegister = exports.generateJWTEmail = exports.generateJWT = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const env_config_1 = require("../../config/envs/env.config");
const generateJWT = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, env_config_1.envs.JWT_SECRET, { expiresIn: "180d" });
    return token;
};
exports.generateJWT = generateJWT;
const generateJWTEmail = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, env_config_1.envs.JWT_SECRET, { expiresIn: "30m" });
    return token;
};
exports.generateJWTEmail = generateJWTEmail;
const generateJWTRegister = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, env_config_1.envs.JWT_SECRET, { expiresIn: "30m" });
    return token;
};
exports.generateJWTRegister = generateJWTRegister;
const dataJwt = (token) => {
    try {
        const data = jsonwebtoken_1.default.verify(token, env_config_1.envs.JWT_SECRET);
        return data;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            throw new Error(error.message);
        }
        else if (error instanceof jsonwebtoken_1.NotBeforeError) {
            throw new Error("El token no se encuentra activo.");
        }
        else if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            throw new Error("Token experiado");
        }
        else {
            throw new Error("Ocurrio un error al verificar token");
        }
    }
};
exports.dataJwt = dataJwt;
const dataRegisterJwt = (token) => {
    try {
        const data = jsonwebtoken_1.default.verify(token, env_config_1.envs.JWT_SECRET);
        return data;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            throw new Error(error.message);
        }
        else if (error instanceof jsonwebtoken_1.NotBeforeError) {
            throw new Error("El token no se encuentra activo.");
        }
        else if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            throw new Error("Token experiado");
        }
        else {
            throw new Error("Ocurrio un error al verificar token");
        }
    }
};
exports.dataRegisterJwt = dataRegisterJwt;
const dataEmailJwt = (token) => {
    try {
        const data = jsonwebtoken_1.default.verify(token, env_config_1.envs.JWT_SECRET);
        return data;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            throw new Error(error.message);
        }
        else if (error instanceof jsonwebtoken_1.NotBeforeError) {
            throw new Error("El token no se encuentra activo.");
        }
        else if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            throw new Error("Token experiado");
        }
        else {
            throw new Error("Ocurrio un error al verificar token");
        }
    }
};
exports.dataEmailJwt = dataEmailJwt;
