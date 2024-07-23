import { Model } from "mongoose";
import { ICategory } from "../models/Category.model";
import { ISpecialty } from "../models/Specialty.model";

export class SpecialtyRepository {
  private readonly specialtyModel: Model<ISpecialty>;
  private readonly categoryModel: Model<ICategory>;
  constructor(
    specialtyModel: Model<ISpecialty>,
    categoryModel: Model<ICategory>
  ) {
    this.categoryModel = categoryModel;
    this.specialtyModel = specialtyModel;
  }

  async find() {
    try {
      const specialties = await this.specialtyModel.find();
      const categories = await this.categoryModel.find();

      return { specialties, categories };
    } catch (error) {
      throw error;
    }
  }
}
