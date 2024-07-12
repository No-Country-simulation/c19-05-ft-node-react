import { Request, Response, Router } from "express";
import { addCategories, addSpecialties, categories, specialties } from "../seed/categorias";
import Specialty from "../models/Specialty.model";

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

		res.status(201).json({
			specialties
		});
	} catch (error) {
		
	}
})

export default routerSeed;