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
    const zodErrorMessage = error.message || "Validation Error";
    const zodErrors =
      error.errors.length > 0 ? error.errors : [{ message: zodErrorMessage }];

    return res.status(400).json({
      status: "error",
      payload: zodErrorMessage,
      errors: zodErrors,
    });
  }

  if (error instanceof MongooseError) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        payload: "Validation error in database",
        errors: (error as any).errors,
      });
    } else if (error.name === "CastError") {
      return res.status(400).json({
        status: "error",
        payload: "Invalid data type",
        error: error,
      });
    } else {
      return res.status(500).json({
        status: "error",
        payload: error.message || "Database error occurred",
        error: error,
      });
    }
  }
  const genericErrorMessage = error.message || "Internal Server Error";

  console.log(error.stack);
  return res
    .status(500)
    .json({ status: "error", payload: genericErrorMessage });
};

/**
 * catch (error) {
		if (error instanceof ZodError) {
			const errorDetails = error.errors.map((err) => ({
				path: err.path.join("."),
				error: err.message,
			}));
			return res.status(400).json(errorDetails);
		} else if (error instanceof Error) {
			return res.status(400).json({ error: error.message });
		}
	}
 */
