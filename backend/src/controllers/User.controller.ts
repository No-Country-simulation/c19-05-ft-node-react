import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/User.service";
import UserModel, { enumType, IUser, specialty } from "../models/User.model";
import { UserUpdateType } from "../utils/schema/user.schema";
import { Document, Types } from "mongoose";
import { InternalServerError } from "../utils/errors/InternalServerError";
import { BadRequestError } from "../utils/errors/BadRequestError";

export class UserController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.verifyEmail(req.body);
      res.send(result);
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

      res.cookie("token", result.token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.send({
        status: result.status,
        payload: result.payload,
      });
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
      res.send(result);
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
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      return next(new InternalServerError());
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId = null } = req.params;
    const userEmail = req.user?.email || null;
    let page: string | null =
      typeof req.query.page === "string" ? req.query.page : null;
    if (page && isNaN(+page)) {
      page = null;
    }
    try {
      const result = await this.userService.find(categoryId, page, userEmail);
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
      result.status == "success";
      res.send(result);
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
      res.send(result);
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
    const { userId: userTwoId, tradeId } = req.params;
    const {
      comment = "",
      rating,
    }: { comment: string | undefined; rating: enumType } = req.body;
    const user = req.user!;
    const userId = user._id;

    try {
      const result = await this.userService.updateRating(
        { userId, tradeId, comment, rating },
        user,
        userTwoId
      );

      res.send(result);
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
      res.send(result);
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
        throw new BadRequestError("photo upload is required");
      }
      const { status, payload } = await this.userService.updatePick(
        req.user!,
        photo!
      );
      res.send({ status, payload: payload });
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      return next(new InternalServerError());
    }
  };

  // getPotentialPairings = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const user = req.user as IUser;
  //     const result = await this.userService.getSuggestions(user);
  //     result!.status === "success"
  //       ? res.status(200).send(result)
  //       : res.status(500).send(result);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       return next(error);
  //     }

  //     return next(new InternalServerError());
  //   }
  // };

  getPotentialPairings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { categoryId = null } = req.params;
    let page: string | null =
      typeof req.query.page === "string" ? req.query.page : null;

    // Our service needs information about the user
    const user = req.user as IUser;
    if (page && isNaN(+page)) {
      page = null;
    }
    try {
      const result = await this.userService.getSuggestions(
        categoryId,
        page,
        user
      );
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
}
