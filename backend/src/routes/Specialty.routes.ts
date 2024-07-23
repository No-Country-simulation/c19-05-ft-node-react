import { Router } from "express";
import { authValidatePassport } from "../middlewares/authValidate";
import { SpecialtyController } from "../controllers/Specialty.controller";
import { SpecialtyService } from "../services/Specialty.service";
import { SpecialtyRepository } from "../repositories/Specialty.repository";
import Specialty from "../models/Specialty.model";
import Category from "../models/Category.model";

const specialtyRepository = new SpecialtyRepository(Specialty, Category);
const specialtyService = new SpecialtyService(specialtyRepository);
const specialtyController = new SpecialtyController(specialtyService);
const routerSpecialty = Router();

routerSpecialty.get(
  "/specialties",
  authValidatePassport,
  specialtyController.find
);

export { routerSpecialty };
