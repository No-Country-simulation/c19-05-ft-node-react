import { Router } from "express";
import { middlewareParamsObjectId } from "../middlewares/validateParamObjectId";
import { middlewareBody } from "../middlewares/validateBody";
import { RegisterSchema } from "../utils/schema/auth.schema";
import { UserController } from "../controllers/User.controller";
import { UserUpdateSchema, UserEmailSchema, ResetPasswordSchema } from "../utils/schema/user.schema";
import { UserRepository } from "../repositories/User.repository";
import { UserService } from "../services/User.service";
import { authValidatePassport, authValidatePassportOptional } from "../middlewares/authValidate";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const router = Router();

router.post("/user",middlewareBody(RegisterSchema),userController.createUser);
router.get("/user/confirm-email/:token", userController.confirmRegister);
router.post("/user/reset-password",middlewareBody(UserEmailSchema), userController.sendResetPasswordToken);
router.put("/user/reset-password/:token", middlewareBody(ResetPasswordSchema), userController.resetPassword);


router.get("/user/:categoryId?",userController.getUsers)

// ! Middleware general 
router.param("userId",middlewareParamsObjectId("userId"))

router.get("/user/details/:userId", authValidatePassportOptional ,userController.getUser);
router.put("/user/:userId",middlewareBody(UserUpdateSchema),userController.updateUser);
router.delete("/user/:userId",userController.delete);







export default router;