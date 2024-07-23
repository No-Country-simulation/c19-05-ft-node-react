import { Request, Response, NextFunction } from "express";
import { RatingService } from "../services/Rating.service";
import { InternalServerError } from "../utils/errors/InternalServerError";

export class RatingController {
  ratingService: RatingService;
  constructor(ratingService: RatingService) {
    this.ratingService = ratingService;
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { comment } = req.body;
    const user = req.user;
    try {
      const result = await this.ratingService.create({
        userId: user?.id,
        comment,
      });
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      return next(new InternalServerError());
    }
  };

  find = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.ratingService.find();
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  findFeaturedRatings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.ratingService.findFeaturedRatings();
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    const { ratingId } = req.params;
    try {
      const result = await this.ratingService.findById(ratingId);

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
      const result = await this.ratingService.findByUserId(userId);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { comment } = req.body;
    try {
      const result = await this.ratingService.updateComment(user?.id, comment);

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  updateFeaturedRatings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { ratingIds } = req.body;

    try {
      const result = await this.ratingService.updateFeaturedRatings(ratingIds);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    const { ratingId } = req.params;
    try {
      const result = await this.ratingService.deleteById(ratingId);

      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  deleteByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
      const result = await this.ratingService.deleteByUserId(userId);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
}
