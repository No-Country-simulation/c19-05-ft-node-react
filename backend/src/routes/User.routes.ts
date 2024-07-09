import { Router } from "express";
import { middlewareParamsObjectId } from "../middlewares/validateParamObjectId";
import { middlewareBody } from "../middlewares/validateBody";
import { RegisterSchema } from "../utils/schema/auth.schema";
import { UserController } from "../controllers/User.controller";
import { UserUpdateSchema, UserEmailSchema, ResetPasswordSchema } from "../utils/schema/user.schema";
import { UserRepository } from "../repositories/User.repository";
import { UserService } from "../services/User.service";
import { authValidatePassport, authValidatePassportOptional } from "../middlewares/authValidate";
import { TradeService } from "../services/Trade.service";
import { TradeRepository } from "../repositories/Trade.repository";

const userRepository = new UserRepository();
const tradeRepository = new TradeRepository()
const tradeService = new TradeService(tradeRepository,userRepository)
const userService = new UserService(userRepository,tradeService);
const userController = new UserController(userService);

const routerUser = Router();

routerUser.post("/user",middlewareBody(RegisterSchema),userController.createUser);
routerUser.get("/user/confirm-email/:token", userController.confirmRegister);
routerUser.post("/user/reset-password",middlewareBody(UserEmailSchema), userController.sendResetPasswordToken);
routerUser.put("/user/reset-password/:token", middlewareBody(ResetPasswordSchema), userController.resetPassword);


routerUser.get("/user/:categoryId?",userController.getUsers)

// ! Middleware general 
routerUser.param("userId",middlewareParamsObjectId("userId"))

routerUser.get("/user/details/:userId", authValidatePassportOptional ,userController.getUser);
routerUser.put("/user/:userId",middlewareBody(UserUpdateSchema),userController.updateUser);
routerUser.delete("/user/:userId",userController.delete);




export default routerUser;