import { Request, Response, Router } from "express";
import {
  addCategories,
  addSpecialties,
  categories,
  specialties,
} from "../seed/categorias";
import Specialty from "../models/Specialty.model";
import {
  assignSpecialtiesAndInterests,
  hashAllPasswords,
  IUserSeed,
  users,
} from "../seed/users";
import UserModel, { specialty } from "../models/User.model";

const routerSeed = Router();

routerSeed.get("/seed", async (req: Request, res: Response) => {
  try {
    const result = await addCategories(categories);
    res.send({ message: result });
  } catch (error) {
    console.log(error);
  }
});

routerSeed.get("/seed/specialties", async (req: Request, res: Response) => {
  try {
    const result = await addSpecialties(specialties);
    res.send({ message: result });
  } catch (error) {
    console.log(error);
  }
});

routerSeed.get("/seed/users", async (req: Request, res: Response) => {
  try {
    const specialties = await Specialty.find();
    const specialtiesFiltered: specialty[] = specialties.map((specialty) => {
      const { _id, categoryId } = specialty;
      return {
        specialtyId: _id,
        categoryId,
      } as specialty;
    });
    let usersHashed: IUserSeed[] = await hashAllPasswords(users);

    usersHashed = assignSpecialtiesAndInterests(
      usersHashed,
      specialtiesFiltered
    );

    const user = await UserModel.create(usersHashed);

    res.status(201).json({
      status: "success",
      results: user.length,
      users: user,
    });
  } catch (error) {}
});

export default routerSeed;
