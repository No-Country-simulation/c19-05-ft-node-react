import { Request, Response, Router } from "express";
import { addCategories, addSpecialties, categories, specialties } from "../seed/categorias";
import Specialty from "../models/Specialty.model";
import { hashAllPasswords, users } from "../seed/users";

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
		// 3) tomar los usuarios y hashear sus contraseñas
		const usersHashed = await hashAllPasswords(users);

		res.status(201).json({
			status: 'success',
			results: usersHashed.length,
			users: usersHashed
		});
	} catch (error) {
		
	}
})

export default routerSeed;