/** @format */
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { corsConfig } from "./config/cors/cors";
import { connectDB } from "./config/db/mongo.config";
const app = express();

app.use(cors(corsConfig));

app.use(morgan("dev"));

app.use(cookieParser());

app.use(express.json());

connectDB();

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`rest api funcionando en el puerto ${port}`);
});
