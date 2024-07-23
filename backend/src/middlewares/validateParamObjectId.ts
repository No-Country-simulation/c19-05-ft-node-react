import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { InternalServerError } from "../utils/errors/InternalServerError";

export const middlewareParamsObjectId =
  (nombreId: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = Types.ObjectId.isValid(req.params[nombreId]);

      if (result) return next();

      return next(new BadRequestError("Invalid Id"));
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
