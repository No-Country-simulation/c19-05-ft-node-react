import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { InternalServerError } from "../utils/errors/InternalServerError";

export const middlewareBody =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.parse(req.body);

      if (result) return next();
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
