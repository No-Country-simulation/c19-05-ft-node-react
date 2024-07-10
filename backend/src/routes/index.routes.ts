import { Router } from "express";
import  routerAuth  from "./Auth.routes";
import routerSeed from "./Seed.routes";
import routerTrade from "./Trade.routes";
import routerUser from "./User.routes";

const router = Router();

router.use('/api', routerUser);
router.use('/api', routerAuth);
router.use('/api', routerTrade);
router.use('/', routerSeed);

export default router;