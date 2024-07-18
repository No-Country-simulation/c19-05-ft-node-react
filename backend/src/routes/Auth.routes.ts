import { Router } from "express";
import { middlewareBody } from "../middlewares/validateBody";
import { LoginSchema } from "../utils/schema/auth.schema";
import { UserRepository } from "../repositories/User.repository";
import { AuthService } from "../services/Auth.service";
import { AuthController } from "../controllers/Auth.controller";
import { authValidatePassportGoogle } from "../middlewares/authValidate";
import { authValidatePassport } from "../middlewares/authValidate";

const routerAuth = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

routerAuth.post(
  "/auth/login",
  middlewareBody(LoginSchema),
  authController.login
);
routerAuth.post(
  "/auth/google",
  authValidatePassportGoogle,
  authController.google
);
routerAuth.get("/auth/logout", authController.logout);
routerAuth.get("/auth/user", authValidatePassport, authController.user);

export default routerAuth;
