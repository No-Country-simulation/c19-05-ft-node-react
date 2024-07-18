/** @format */
import cookieParser from "cookie-parser";
import express, { Request, Response, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import { corsConfig } from "./config/cors/cors";
import { connectDB } from "./config/db/mongo.config";
import passport from "passport";
import { initializePassport } from "./config/passport/passport.config";

import router from "./routes/index.routes";

import { envs } from "./config/envs/env.config";
import { addCategories, categories } from "./seed/categorias";

const app = express();

app.use(cors(corsConfig));

app.use(morgan("dev"));

app.use(cookieParser(envs.COOKIE_SECRETKEY));

app.use(express.json());

initializePassport();
app.use(passport.initialize());

app.use(express.urlencoded({ extended: true }));
app.use("/", router);

connectDB();

app.listen(envs.PORT, () => {
  console.log(`rest api funcionando en el puerto ${envs.PORT}`);
});
