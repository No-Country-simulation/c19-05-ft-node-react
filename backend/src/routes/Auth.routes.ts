import { Router } from "express";
import { middlewareBody } from "../middlewares/validateBody";
import { LoginSchema } from "../utils/schema/auth.schema";
import { UserRepository } from "../repositories/User.repository";
import { AuthService } from "../services/Auth.service";
import { AuthController } from "../controllers/Auth.controller";
import { authValidate } from "../middlewares/authValidate";

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);


router.post("/auth/login",middlewareBody(LoginSchema),authController.login)
router.get("/auth/logout",authController.logout)
router.get("/auth/user",authValidate,authController.user)










export default router