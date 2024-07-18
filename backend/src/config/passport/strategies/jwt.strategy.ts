import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback,
} from "passport-jwt";
import { Request } from "express";
import { envs } from "../../envs/env.config";
import UserModel from "../../../models/User.model";

type TokenPayload = {
  id: string;
};

const cookieExtractor = (req: Request): string | null => {
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookieHeader.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "token") {
        return value;
      }
    }
  }

  const token = req.cookies ? req.cookies.jwt : null;
  return token;
};

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: envs.JWT_SECRET,
};

const strategyJWT = new JwtStrategy(
  options,
  async (payload: TokenPayload, done: VerifiedCallback) => {
    try {
      const user = await UserModel.findById(payload.id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
);

export default strategyJWT;
