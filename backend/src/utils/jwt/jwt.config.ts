import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";

import { Types } from "mongoose";
import { envs } from "../../config/envs/env.config";
import { RegisterType } from "../schema/auth.schema";

type UserPayload = {
  id: Types.ObjectId;
};

type EmailPayload = {
  email: string;
};

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "180d" });
  return token;
};

export const generateJWTEmail = (payload: EmailPayload) => {
  const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "30m" });
  return token;
};

export const generateJWTRegister = (payload: RegisterType) => {
  const token = jwt.sign(payload, envs.JWT_SECRET, { expiresIn: "30m" });
  return token;
};

export const dataJwt = (token: string) => {
  try {
    const data = jwt.verify(token, envs.JWT_SECRET);
    return data;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new Error(error.message);
    } else if (error instanceof NotBeforeError) {
      throw new Error("El token no se encuentra activo.");
    } else if (error instanceof TokenExpiredError) {
      throw new Error("Token experiado");
    } else {
      throw new Error("Ocurrio un error al verificar token");
    }
  }
};

export const dataRegisterJwt = (token: string) => {
  try {
    const data = jwt.verify(token, envs.JWT_SECRET) as RegisterType;
    return data;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new Error(error.message);
    } else if (error instanceof NotBeforeError) {
      throw new Error("El token no se encuentra activo.");
    } else if (error instanceof TokenExpiredError) {
      throw new Error("Token experiado");
    } else {
      throw new Error("Ocurrio un error al verificar token");
    }
  }
};

export const dataEmailJwt = (token: string) => {
  try {
    const data = jwt.verify(token, envs.JWT_SECRET) as EmailPayload;
    return data;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new Error(error.message);
    } else if (error instanceof NotBeforeError) {
      throw new Error("El token no se encuentra activo.");
    } else if (error instanceof TokenExpiredError) {
      throw new Error("Token experiado");
    } else {
      throw new Error("Ocurrio un error al verificar token");
    }
  }
};
