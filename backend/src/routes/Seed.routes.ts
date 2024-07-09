import { Request, Response, Router } from "express";
import { addCategories, addSpecialties, categories, specialties } from "../seed/categorias";

const router = Router();




router.get("/seed",async (req: Request, res: Response) => {
	try {
		const result = await addCategories(categories);
		res.send({ message: result });
	} catch (error) {
		console.log(error);
	}
})

router.get("/seed/specialties",async (req: Request, res: Response) => {
	try {
		const result = await addSpecialties(specialties);
		res.send({ message: result });
	} catch (error) {
		console.log(error);
	}
})


export default router