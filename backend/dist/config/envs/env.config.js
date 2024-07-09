"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    DATABASE_URL: (0, env_var_1.get)('DATABASE_URL').required().asString(),
    FRONTEND_URL: (0, env_var_1.get)('FRONTEND_URL').required().asString(),
    SMTP_HOST: (0, env_var_1.get)('SMTP_HOST').required().asString(),
    SMTP_PORT: (0, env_var_1.get)('SMTP_PORT').required().asPortNumber(),
    SMTP_USER: (0, env_var_1.get)('SMTP_USER').required().asString(),
    SMTP_PASS: (0, env_var_1.get)('SMTP_PASS').required().asString(),
    JWT_SECRET: (0, env_var_1.get)('JWT_SECRET').required().asString(),
    BCRYPT_SALT: (0, env_var_1.get)('BCRYPT_SALT').required().asInt(),
    COOKIE_SECRETKEY: (0, env_var_1.get)('COOKIE_SECRETKEY').required().asString(),
};
