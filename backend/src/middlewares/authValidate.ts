import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User.model";
import { UserRepository } from "../repositories/User.repository";
import passport from "passport";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const userRepository = new UserRepository();

export const authValidatePassport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", (error: any, user: IUser, info: any) => {
    if (error) {
      return res.status(401).send({
        status: "error",
        message: "Hubo un error al autenticar.",
        error: error.message,
      });
    }

    if (!user) {
      return res.status(401).send({
        status: "error",
        message: "No se ha podido autenticar al usuario.",
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
  passport.authenticate("jwt", (error: any, user: IUser, info: any) => {
    if (error || !user) {
      return next();
    }

    req.user = user as IUser;
    return next();
  })(req, res, next);
};

export const authValidatePassportGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("gmail", (error: any, user: IUser, info: any) => {
    if (error || !user) {
      return next();
    }

    req.user = user as IUser;
    return next();
  })(req, res, next);
};

export const authValidateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).send({
      status: "error",
      message: "No se ha podido identificar al usuario.",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(401).send({
      status: "error",
      message: "No posee los permisos necesarios",
    });
  }

  next();
};
