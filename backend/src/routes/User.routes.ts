import { Router } from "express";
import { middlewareParamsObjectId } from "../middlewares/validateParamObjectId";
import { middlewareBody } from "../middlewares/validateBody";
import { RegisterSchema } from "../utils/schema/auth.schema";
import { UserController } from "../controllers/User.controller";
import { UserUpdateSchema } from "../utils/schema/user.schema";
import { UserRepository } from "../repositories/User.repository";
import { UserService } from "../services/User.service";

const userController = new UserController(new UserService(new UserRepository()))

const router = Router();

router.post("/user",middlewareBody(RegisterSchema),userController.createUser)

router.get("/user/:categoryId?",userController.getUsers)

// ! Middleware general 
router.param("userId",middlewareParamsObjectId("userId"))

router.get("/user/:userId",userController.getUserAuth) // auth

router.get("/user/:userId",userController.getUser)

router.put("/user/:userId",middlewareBody(UserUpdateSchema),userController.updateUser)


router.delete("/user/:userId",userController.delete)







export default router;