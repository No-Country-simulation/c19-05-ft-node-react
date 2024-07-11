import { Types } from "mongoose";
import { RatingRepository } from "../repositories/Rating.repository";
import { UserRepository } from "../repositories/User.repository";
import { createRatingType } from "../models/Rating.model";

export class RatingService {
    private readonly ratingRepository: RatingRepository;
    private readonly userRepository: UserRepository;
    constructor(ratingRepository: RatingRepository, userRepository: UserRepository) {
        this.ratingRepository = ratingRepository,
        this.userRepository = userRepository
    }

    async create() {
        try {

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

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))

        }
    }

    async findFeaturedRatings () {
        try {

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))

        }
    }

    async findById() {
        try {

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))

        }
    }

    async findByUserId() {
        try {

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))

        }
    }

    async updateComment() {
        try {

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

              throw new Error(String(error))
        }
    }

    async updateFeaturedRatings() {
        try {

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
        }
    }

    async deleteById() {
        try {

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
        }
    }

    async deleteByUserId() {
        try {

        } catch (error) {
            console.log(error)
            if (error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
        }
    }
}
