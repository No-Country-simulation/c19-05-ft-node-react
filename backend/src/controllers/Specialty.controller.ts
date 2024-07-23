import { NextFunction, Request, Response } from "express";
import { SpecialtyService } from "../services/Specialty.service";
import { InternalServerError } from "../utils/errors/InternalServerError";

export class SpecialtyController {
  private readonly specialtyService: SpecialtyService;

  constructor(specialtyService: SpecialtyService) {
    this.specialtyService = specialtyService;
  }

  find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.specialtyService.find();
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
}
