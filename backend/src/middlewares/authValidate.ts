import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User.model";
import { dataJwt } from "../utils/jwt/jwt.config";
import { UserRepository } from "../repositories/User.repository";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import passport from 'passport';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const userRepository = new UserRepository()

export const authValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "no estas autorizado" });
  } else {
    try {
      const userId = dataJwt(token);

      if (!userId) {
        return res
          .status(404)

          .send({ error: "Hubo un error al autentificar el usuario." });
      }
      if (typeof userId === "object" && userId.id) {
        const user = await userRepository.findOne(userId.id)

        if (!user) {
          return res.status(500).json({ error: "Token no valido" });
        }
        req.user = user as IUser;

        return next();
      }
    } catch (error) {
      if (
        error instanceof JsonWebTokenError ||
        error instanceof TokenExpiredError ||
        error instanceof NotBeforeError
      ) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error del servidor" });
      }
    }
  }
};

export const authValidatePassport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('jwt', (error: any, user: IUser, info: any) => {
    if (error) {
      return res.status(401).send({
        status: 'error',
        message: 'Hubo un error al autenticar.',
        error: error.message
      });
    }

    if (!user) {
      return res.status(401).send({
        status: 'error',
        message: 'No se ha podido autenticar al usuario.',
      });
    }

    req.user = user as IUser;
    next();
  })(req, res, next);
};

export const authValidatePassportOptional = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('jwt', (error: any, user: IUser, info: any) => {
    if (error || !user) {
      return next();
    }

    req.user = user as IUser;
    next();
  })(req, res, next);
};