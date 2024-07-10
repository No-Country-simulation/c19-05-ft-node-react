"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors/cors");
const mongo_config_1 = require("./config/db/mongo.config");
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = require("./config/passport/passport.config");
const User_routes_1 = __importDefault(require("./routes/User.routes"));
const Auth_routes_1 = __importDefault(require("./routes/Auth.routes"));
const env_config_1 = require("./config/envs/env.config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_2.corsConfig));
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)(env_config_1.envs.COOKIE_SECRETKEY));
app.use(express_1.default.json());
(0, passport_config_1.initializePassport)();
app.use(passport_1.default.initialize());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', User_routes_1.default);
app.use('/api', Auth_routes_1.default);
(0, mongo_config_1.connectDB)();
app.listen(env_config_1.envs.PORT, () => {
    console.log(`rest api funcionando en el puerto ${env_config_1.envs.PORT}`);
});
