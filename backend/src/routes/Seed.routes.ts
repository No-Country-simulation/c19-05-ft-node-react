import { Request, Response, Router } from "express";
import { addCategories, addSpecialties, categories, specialties } from "../seed/categorias";

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

		res.status(201).send('este endpoint está sirviendo');
	} catch (error) {
		
	}
})

export default routerSeed;