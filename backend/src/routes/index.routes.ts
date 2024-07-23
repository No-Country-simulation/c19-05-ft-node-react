import { Router } from "express";
import routerAuth from "./Auth.routes";
import routerSeed from "./Seed.routes";
import routerTrade from "./Trade.routes";
import routerUser from "./User.routes";
import routerRating from "./Rating.routes";
import routerChat from "./Chat.routes";
import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/errors/NotFoundError";
import { errorHandler } from "../middlewares/errorHandler";
import { routerSpecialty } from "./Specialty.routes";

const router = Router();

router.use("/api", routerUser);
router.use("/api", routerAuth);
router.use("/api", routerTrade);
router.use("/api", routerRating);
router.use("/api", routerChat);
router.use("/api", routerSpecialty);
router.use("/", routerSeed);

//404
router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

//Manejo de Errores
router.use(errorHandler);

export default router;
