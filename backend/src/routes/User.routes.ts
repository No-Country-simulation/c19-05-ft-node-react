import { Router } from "express";
import { middlewareParamsObjectId } from "../middlewares/validateParamObjectId";
import { middlewareBody } from "../middlewares/validateBody";
import { RegisterSchema } from "../utils/schema/auth.schema";
import { UserController } from "../controllers/User.controller";
import {
  UserUpdateSchema,
  UserEmailSchema,
  ResetPasswordSchema,
  UpdateUserRating,
} from "../utils/schema/user.schema";
import { UserRepository } from "../repositories/User.repository";
import { UserService } from "../services/User.service";
import {
  authValidatePassport,
  authValidatePassportOptional,
} from "../middlewares/authValidate";
import { TradeRepository } from "../repositories/Trade.repository";
import { verifyCategoryAndSpecialty } from "../middlewares/verifyCategoryAndSpecialty";
import { upload } from "../middlewares/validate.multer";

const userRepository = new UserRepository();
const tradeRepository = new TradeRepository();
const userService = new UserService(userRepository, tradeRepository);
const userController = new UserController(userService);

const routerUser = Router();

// Already documented
routerUser.post(
  "/user",
  middlewareBody(RegisterSchema),
  userController.createUser
);
// Already documented
routerUser.get("/user/confirm-email/:token", userController.confirmRegister);
// Already documented
routerUser.post(
  "/user/reset-password",
  middlewareBody(UserEmailSchema),
  userController.sendResetPasswordToken
);
// Already documented
routerUser.put(
  "/user/reset-password/:token",
  middlewareBody(ResetPasswordSchema),
  userController.resetPassword
);

// TODO: endpoint for showing all potential users
routerUser.get(
  "/user/potential-trades/:categoryId?",
  authValidatePassport,
  userController.getPotentialPairings
);

// Already documented
routerUser.get("/user/:categoryId?", userController.getUsers);

// ! Middleware general
routerUser.param("userId", middlewareParamsObjectId("userId"));
routerUser.param("tradeId", middlewareParamsObjectId("tradeId"));

// TODO: document endpoint for getting a single user
routerUser.get(
  "/user/details/:userId",
  authValidatePassportOptional,
  userController.getUser
);
// TODO: document endpoint for user update. Be dead specific about it and include examples
routerUser.put(
  "/user/",
  authValidatePassport,
  verifyCategoryAndSpecialty("specialties"),
  verifyCategoryAndSpecialty("interests"),
  middlewareBody(UserUpdateSchema),
  userController.updateUser
);
// Already documented
routerUser.delete("/user/:userId", userController.delete);

// TODO: document this endpoint for photo update
routerUser.put(
  "/user/profile-photo",
  authValidatePassport,
  upload.single("profile-pick"),
  userController.updatePick
);

routerUser.put(
  "/user/:userId/update-rating/:tradeId",
  authValidatePassport,
  middlewareBody(UpdateUserRating),
  userController.updateUserRating
);

export default routerUser;
