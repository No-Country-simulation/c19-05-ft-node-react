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
import { RegistrationTokenRepository } from "../repositories/RegistrationToken";
import { verifyCategoryAndSpecialty } from "../middlewares/verifyCategoryAndSpecialty";
import { upload } from "../middlewares/validate.multer";

const userRepository = new UserRepository();
const tradeRepository = new TradeRepository();
const registrationTokenRepository = new RegistrationTokenRepository();
const userService = new UserService(
  userRepository,
  tradeRepository,
  registrationTokenRepository
);
const userController = new UserController(userService);

const routerUser = Router();

routerUser.post(
  "/user",
  middlewareBody(RegisterSchema),
  userController.createUser
);

routerUser.get("/user/confirm-email/:token", userController.confirmRegister);

routerUser.post(
  "/user/reset-password",
  middlewareBody(UserEmailSchema),
  userController.sendResetPasswordToken
);

routerUser.put(
  "/user/reset-password/:token",
  middlewareBody(ResetPasswordSchema),
  userController.resetPassword
);

routerUser.get(
  "/user/potential-trades/:categoryId?",
  authValidatePassport,
  userController.getPotentialPairings
);

routerUser.get(
  "/user/:categoryId?",
  authValidatePassportOptional,
  userController.getUsers
);

routerUser.param("userId", middlewareParamsObjectId("userId"));
routerUser.param("tradeId", middlewareParamsObjectId("tradeId"));

routerUser.get(
  "/user/details/:userId",
  authValidatePassportOptional,
  userController.getUser
);

routerUser.put(
  "/user/",
  authValidatePassport,
  verifyCategoryAndSpecialty("specialties"),
  verifyCategoryAndSpecialty("interests"),
  middlewareBody(UserUpdateSchema),
  userController.updateUser
);

routerUser.delete("/user/:userId", userController.delete);

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
