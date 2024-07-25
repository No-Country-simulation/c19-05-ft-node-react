import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/Auth.service";
import { LoginType } from "../utils/schema/auth.schema";

import { InternalServerError } from "../utils/errors/InternalServerError";
import { AuthorizationError } from "../utils/errors/AuthorizationError";

export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const data: LoginType = req.body;

    try {
      const result = await this.authService.login(data);
      console.log(result);

      if (result.status !== "success") {
        res.status(400).send(result);
      } else {
        res.cookie("token", result.token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.status(200).send({
          status: "success",
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

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("token");
      res.status(200).send({
        status: "success",
        payload: "Logout success.",
      });
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  user = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    try {
      const populatedUser = await user!.populate([
        {
          path: "specialties",
          populate: [
            {
              path: "categoryId",
              select: "name",
              model: "Category",
            },
            {
              path: "specialtyId",
              select: "name",
              model: "Specialty",
            },
          ],
        },
        {
          path: "interests",
          populate: [
            {
              path: "categoryId",
              select: "name",
              model: "Category",
            },
            {
              path: "specialtyId",
              select: "name",
              model: "Specialty",
            },
          ],
        },
        {
          path: "userRatings",
          populate: {
            path: "userId",
            select: "name avatar",
          },
        },
      ]);

      res.status(200).send({
        status: "success",
        payload: populatedUser,
      });
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  google = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    try {
      if (!user || user.provider !== "google") {
        throw new AuthorizationError("Error with google user");
      }

      const result = await this.authService.loginGoogle(user.email);

      res.cookie("token", result.payload, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.send({
        status: "success",
        payload: result.payload,
      });
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
}
