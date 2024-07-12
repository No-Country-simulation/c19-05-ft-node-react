import { Request, Response, Router } from "express";
import { addCategories, addSpecialties, categories, specialties } from "../seed/categorias";
import Specialty from "../models/Specialty.model";
import { users } from "../seed/users";
import { hashPassword } from "../utils/bcrypt/bcrypt.config";

const routerSeed = Router();

routerSeed.get("/seed",async (req: Request, res: Response) => {
	try {
		const result = await addCategories(categories);
		res.send({ message: result });
	} catch (error) {
		console.log(error);
	}
})

routerSeed.get("/seed/specialties",async (req: Request, res: Response) => {
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
		const specialtiesFiltered = specialties.map(specialty => {
			// Extrae los dos campos que nos interesan
			const { _id, categoryId } = specialty;
			// para cada elemento, devuelve un objeto con los campos deseados
			return {
				specialtyId: _id,
				categoryId
			}
		});

		// 3) se consigue la lista de usuarios y se hashea el password
		// 3.1) consiga la función que te hashea el password

		res.status(201).json({
			results: specialtiesFiltered.length,
			specialtiesFiltered,
			users
		});
	} catch (error) {
		
	}
})

export default routerSeed;