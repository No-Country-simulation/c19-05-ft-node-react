import { Router } from "express";
import  routerAuth  from "./Auth.routes";
import routerSeed from "./Seed.routes";
import routerTrade from "./Trade.routes";
import routerUser from "./User.routes";
import routerRating from "./Rating.routes";

const router = Router();

router.use('/api', routerUser);
router.use('/api', routerAuth);
router.use('/api', routerTrade);
router.use('/api', routerRating);
router.use('/', routerSeed);

export default router;