import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export const middlewareParamsObjectId =
  (nombreId: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = Types.ObjectId.isValid(req.params[nombreId]);

    if (result) return next();

    res.status(400).send({
      status: "error",
      message: "Id invalido",
    });
  };
