"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = require("../envs/env.config");
const config = () => {
    return {
        host: env_config_1.envs.SMTP_HOST,
        port: env_config_1.envs.SMTP_PORT,
        auth: {
            user: env_config_1.envs.SMTP_USER,
            pass: env_config_1.envs.SMTP_PASS,
        },
    };
};
exports.transport = nodemailer_1.default.createTransport(config());
