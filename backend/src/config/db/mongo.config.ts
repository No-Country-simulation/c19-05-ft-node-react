/** @format */

import mongoose, { Error as mongooseError } from "mongoose";
import { envs } from "../envs/env.config";

export const connectDB = async () => {
  try {
    await mongoose.connect(envs.DATABASE_URL);

    console.log("Conexion a mongoDB exitosa");
  } catch (error: unknown) {
    if (error instanceof Error) {
      //!Error normal

      console.log(error.message);
    } else if (error instanceof mongooseError) {
      //! Error mongoose

      console.log(error.message);
    }

    process.exit(1);
  }
};
