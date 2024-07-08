/** @format */
import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { corsConfig } from './config/cors/cors';
import { connectDB } from './config/db/mongo.config';
import passport from 'passport';
import { initializePassport } from './config/passport/passport.config';

import userRoutes from './routes/User.routes';
import authRoutes from './routes/Auth.routes';
import { envs } from './config/envs/env.config';

const app = express();

app.use(cors(corsConfig));

app.use(morgan('dev'));

app.use(cookieParser(envs.COOKIE_SECRETKEY));

app.use(express.json());

initializePassport();
app.use(passport.initialize());

app.use(express.urlencoded({ extended: true }));
app.use('/api', userRoutes);
app.use('/api', authRoutes);

connectDB();

app.listen(envs.PORT, () => {
	console.log(`rest api funcionando en el puerto ${envs.PORT}`);
});
