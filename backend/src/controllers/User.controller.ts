import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/User.service";
import UserModel, { enumType, IUser, specialty } from "../models/User.model";
import { UserUpdateType } from "../utils/schema/user.schema";
import { Document, Types } from "mongoose";
import { InternalServerError } from "../utils/errors/InternalServerError";

export class UserController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.verifyEmail(req.body);

      result.status === "success"
        ? res.send(result)
        : res.status(404).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  confirmRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;

    try {
      const result = await this.userService.create(token);

      if (result.status === "success") {
        res.cookie("token", result.token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.send({
          status: result.status,
          payload: result.payload,
        });
      } else {
        res.status(400).send({
          status: result.status,
          payload: result.payload,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  sendResetPasswordToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    try {
      const result = await this.userService.resetEmail(email);
      result.status == "success"
        ? res.send(result)
        : res.status(400).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      const result = await this.userService.updatePassword({ token, password });

      console.log(result);

      result.status == "success"
        ? res.send(result)
        : res.status(409).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId = null } = req.params;
    let page: string | null =
      typeof req.query.page === "string" ? req.query.page : null;
    if (page && isNaN(+page)) {
      page = null;
    }
    try {
      const result = await this.userService.find(categoryId, page);
      result.status == "success"
        ? res.send(result)
        : res.status(500).send(result);
    } catch (error: any) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const user = req.user;
    try {
      const result = await this.userService.findById(user, userId);
      console.log(result);

      result.status == "success"
        ? res.send(result)
        : res.status(400).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  // Nombre descripcion numero
  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const data: UserUpdateType = req.body;
    try {
      const result = await this.userService.update(req.user!._id, data);

      result.status == "success"
        ? res.send(result)
        : res.status(400).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  updateUserRating = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId: CarlosID, tradeId } = req.params;
    const {
      comment = "",
      rating,
    }: { comment: string | undefined; rating: enumType } = req.body;
    const userId = req.user!._id;
    try {
      const result = await this.userService.updateRating(
        { userId, tradeId, comment, rating },
        req.user!
      );
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
      const result = await this.userService.delete(userId);

      result.status == "success"
        ? res.send(result)
        : res.status(400).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  updatePick = async (req: Request, res: Response, next: NextFunction) => {
    const photo = req.file;
    try {
      if (!photo || photo === undefined) {
        return res
          .status(400)
          .send({ status: false, payload: "No se envio ningun archivo" });
      }
      const { status, payload } = await this.userService.updatePick(
        req.user!,
        photo!
      );
      res.send({ status, payload: "Perfil actualizado" });
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  getPotentialPairings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user as IUser;
      const result = await this.userService.getSuggestions(user);
      result!.status === "success"
        ? res.status(200).send(result)
        : res.status(500).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
}
