import { Types } from "mongoose";
import { RatingRepository } from "../repositories/Rating.repository";
import { UserRepository } from "../repositories/User.repository";
import { createRatingType } from "../models/Rating.model";

export class RatingService {
    private readonly ratingRepository: RatingRepository;
    constructor(ratingRepository: RatingRepository) {
        this.ratingRepository = ratingRepository
    }

    async create(rating: createRatingType) {
        try {
            const newRating = await this.ratingRepository.create(rating);

            return {
                status: "success",
                payload: newRating
            }

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))

        }
    }

    async find() {
        try {
            const ratings = await this.ratingRepository.find();

            return {
                status: "success",
                payload: ratings
            }

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))

        }
    }

    async findFeaturedRatings() {
        try {
            const featuredRatings = await this.ratingRepository.findFeaturedRatings();
            return {
                status: "success",
                payload: featuredRatings
            }

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))

        }
    }

    async findById(id: string) {
        try {
            const rating = await this.ratingRepository.findById(id);

            return {
                status: "success",
                payload: rating
            }

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))

        }
    }

    async findByUserId(id: string) {
        try {
            const rating = await this.ratingRepository.findByUserId(id);

            return {
                status: "success",
                payload: rating
            }

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))

        }
    }

    async updateComment(userId: string, comment: string) {
        try {
            const rating = await this.ratingRepository.findByUserId(userId);
            if (!rating) {
                return {
                    status: "error",
                    payload: "El usuario no ha valorado."
                }
            }

            const updatedRating = await this.ratingRepository.updateComment(userId, comment);

            return {
                status: "success",
                payload: updatedRating
            }

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
        }
    }

    async updateFeaturedRatings(ratingIds: string[]) {

        try {
            const ratings = await Promise.all(
                ratingIds.map(async (id) => {
                    const rating = await this.ratingRepository.findById(id);
                    if (rating) {
                        return rating;
                    }
                })
            );

            if (ratings.length !== 5) {
                return {
                    status: "error",
                    payload: "Debes proporcionar exactamente 5 ids válidos."
                };
            }

            const newFeaturedratings = await this.ratingRepository.updateFeaturedRatings(ratingIds);

            return {
                status: "success",
                payload: newFeaturedratings
            }

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
        }
    }

    async deleteById(id: string) {
        try {
            const deletedRating = await this.ratingRepository.deleteById(id);

            return {
                status: "success",
                payload: deletedRating
            }

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
        }
    }

    async deleteByUserId(userId: string) {
        try {
            const deletedRating = await this.ratingRepository.deleteByUserId(userId);

            return {
                status: "success",
                payload: deletedRating
            }

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
        }
    }
}
