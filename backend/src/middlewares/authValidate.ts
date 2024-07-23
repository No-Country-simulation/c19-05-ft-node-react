import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User.model";
import { UserRepository } from "../repositories/User.repository";
import passport from "passport";
import { AuthenticationError } from "../utils/errors/AuthenticationError";
import { AuthorizationError } from "../utils/errors/AuthorizationError";
import { InternalServerError } from "../utils/errors/InternalServerError";

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
    try {
      if (error) {
        return next(new AuthenticationError("There was an error in passport."));
      }

      if (!user) {
        return next(
          new AuthenticationError("Failed to authenticate the user.")
        );
      }

      req.user = user as IUser;
      return next();
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  })(req, res, next);
};

export const authValidatePassportOptional = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", (error: any, user: IUser, info: any) => {
    try {
      if (error || !user) {
        return next();
      }

      req.user = user as IUser;
      return next();
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  })(req, res, next);
};

export const authValidatePassportGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("gmail", (error: any, user: IUser, info: any) => {
    try {
      if (error || !user) {
        return next();
      }

      req.user = user as IUser;
      return next();
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  })(req, res, next);
};

export const authValidateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new AuthenticationError("Failed to authenticate the user."));
    }

    if (req.user.role !== "admin") {
      return next(
        new AuthorizationError("You do not have sufficient permissions.")
      );
    }

    return next();
  } catch (error) {
    if (error instanceof Error) {
      return next(error);
    }

    return next(new InternalServerError());
  }
};
