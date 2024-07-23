import { NextFunction, Request, Response } from "express";
import Category from "../models/Category.model";
import Specialty from "../models/Specialty.model";
import { specialty } from "../models/User.model";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { InternalServerError } from "../utils/errors/InternalServerError";

declare global {
  namespace Express {
    interface Request {
      specialties?: specialty[] | [];
    }
  }
}

type ParameterType = "specialties" | "interests";

export const verifyCategoryAndSpecialty =
  (specialtiesOrInterests: ParameterType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    let checkSpecialtiesOrInterests: specialty[] = [];
    if (specialtiesOrInterests === "specialties") {
      checkSpecialtiesOrInterests = req.body.specialties;
    } else if (specialtiesOrInterests === "interests") {
      checkSpecialtiesOrInterests = req.body.interests;
    }

    const uniqueArray = checkSpecialtiesOrInterests.reduce(
      (accumulator: specialty[], current) => {
        const exists = accumulator.some(
          (item) =>
            item.categoryId === current.categoryId &&
            item.specialtyId === current.specialtyId
        );
        if (!exists) {
          accumulator.push(current);
        }
        return accumulator;
      },
      []
    );

    if (specialtiesOrInterests === "specialties") {
      if (uniqueArray.length === 0) {
        req.body.specialties = uniqueArray;
        return next();
      }
    } else if (specialtiesOrInterests === "interests") {
      if (uniqueArray.length === 0) {
        req.body.interests = uniqueArray;
        return next();
      }
    }
    const arrayPromise = uniqueArray.map((array) => {
      return Specialty.find({
        _id: array.specialtyId,
        categoryId: array.categoryId,
      });
    });
    try {
      const response = await Promise.all(arrayPromise);

      const hasError = response.some((resp) => resp.length === 0);
      if (hasError) {
        return next(
          new BadRequestError(
            "There was an error with the received categories/specialties."
          )
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
