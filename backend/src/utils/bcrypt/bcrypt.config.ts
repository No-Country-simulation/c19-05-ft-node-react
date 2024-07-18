/** @format */

import bcrypt from "bcrypt";
import { envs } from "../../config/envs/env.config";

const saltRounds = envs.BCRYPT_SALT;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error al hashear la contrasenia");
  }
};

export const comparePassword = async (
  password: string,
  passwordHashed: string
): Promise<boolean> => {
  try {
    console.log(password, passwordHashed);
    const result = await bcrypt.compare(password, passwordHashed);
    return result;
  } catch (error) {
    throw new Error("Hubo un error al comparar las pw");
  }
};
