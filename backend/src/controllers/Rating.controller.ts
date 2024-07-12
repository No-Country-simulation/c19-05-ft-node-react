import { Request, Response } from "express";
import { RatingService } from "../services/Rating.service";

export class RatingController {
    ratingService: RatingService
    constructor(ratingService: RatingService) {
        this.ratingService = ratingService
    }

    create = async (req: Request, res: Response) => {
        const { comment } = req.body
        const user = req.user
        try {
            const result = await this.ratingService.create({userId: user?.id, comment});

            result.status == "success" ? res.send(result)
                : res.status(409).send(result)

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    find = async (req: Request, res: Response) => {
        try {
            const result = await this.ratingService.find();

            result.status == "success" ? res.send(result)
                : res.status(400).send(result)

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    findFeaturedRatings = async (req: Request, res: Response) => {
        try {
            const result = await this.ratingService.findFeaturedRatings();

            result.status == "success" ? res.send(result)
                : res.status(400).send(result)

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    findById = async (req: Request, res: Response) => {
        const { ratingId } = req.params;
        try {
            const result = await this.ratingService.findById(ratingId);

            result.status == "success" ? res.send(result)
                : res.status(400).send(result)

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    findByUserId = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try {
            const result = await this.ratingService.findByUserId(userId);

            result.status == "success" ? res.send(result)
                : res.status(400).send(result)

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    updateComment = async (req: Request, res: Response) => {
        const user = req.user;
        const { comment } = req.body
        try {
            const result = await this.ratingService.updateComment(user?.id, comment);

            result.status == "success" ? res.send(result)
                : res.status(400).send(result)

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    updateFeaturedRatings = async (req: Request, res: Response) => {
        const { ratingIds } = req.body;

        try {
            const result = await this.ratingService.updateFeaturedRatings(ratingIds);

            result.status == "success" ? res.send(result)
                : res.status(400).send(result)

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    deleteById = async (req: Request, res: Response) => {
        const { ratingId } = req.params;
        try {
            const result = await this.ratingService.deleteById(ratingId);

            result.status == "success" ? res.send(result)
                : res.status(400).send(result)

        } catch (error) {
            console.log(error);

        }
    }

    deleteByUserId = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try {
            const result = await this.ratingService.deleteByUserId(userId);

            result.status == "success" ? res.send(result)
                : res.status(400).send(result)

        } catch (error) {
            console.log(error);

        }
    }
}