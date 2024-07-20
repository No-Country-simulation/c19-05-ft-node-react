import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/errors/CustomError";
import { ZodError } from "zod";
import { MongooseError } from "mongoose";

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.StatusCode).json(error.serialize());
  }

  if (error instanceof ZodError) {
    const message = error.message || "Validation Error";
    return res
      .status(400)
      .json({ status: "error", message: message, error: error.errors });
  }

  if (error instanceof MongooseError) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: "Validation error in database",
        errors: (error as any).errors,
      });
    } else if (error.name === "CastError") {
      return res.status(400).json({
        status: "error",
        message: "Invalid data type",
        error: error,
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: error.message || "Database error occurred",
        error: error,
      });
    }
  }

  console.log(error.stack);
  return res
    .status(500)
    .json({ status: "error", message: "Internal Server Error" });
};
