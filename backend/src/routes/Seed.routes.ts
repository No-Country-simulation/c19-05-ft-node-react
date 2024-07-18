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
    // 1) conseguir lista de especialidades, las cuales vamos a usar para agregar a cada usuario
    const specialties = await Specialty.find();
    // 2) filtrar la lista
    const specialtiesFiltered: specialty[] = specialties.map((specialty) => {
      // Extrae los dos campos que nos interesan
      const { _id, categoryId } = specialty;
      // para cada elemento, devuelve un objeto con los campos deseados
      return {
        specialtyId: _id,
        categoryId,
      } as specialty;
    });
    // 3) tomar los usuarios y hashear sus contraseñas
    let usersHashed: IUserSeed[] = await hashAllPasswords(users);

    // 4) agregar especialidades a cada usuario
    usersHashed = assignSpecialtiesAndInterests(
      usersHashed,
      specialtiesFiltered
    );

    // 5) después de haber agregado las especialidades, se añaden a la base de datos
    const user = await UserModel.create(usersHashed);

    res.status(201).json({
      status: "success",
      results: user.length,
      users: user,
    });
  } catch (error) {}
});

export default routerSeed;
