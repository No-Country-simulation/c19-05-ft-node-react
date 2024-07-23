import { Types } from "mongoose";
import { RatingRepository } from "../repositories/Rating.repository";
import { createRatingType } from "../models/Rating.model";
import { BadRequestError } from "../utils/errors/BadRequestError";

export class RatingService {
  private readonly ratingRepository: RatingRepository;
  constructor(ratingRepository: RatingRepository) {
    this.ratingRepository = ratingRepository;
  }

  async create(rating: createRatingType) {
    try {
      const newRating = await this.ratingRepository.create(rating);

      return {
        status: "success",
        payload: newRating,
      };
    } catch (error) {
      throw error;
    }
  }

  async find() {
    try {
      const ratings = await this.ratingRepository.find();

      return {
        status: "success",
        payload: ratings,
      };
    } catch (error) {
      throw error;
    }
  }

  async findFeaturedRatings() {
    try {
      const featuredRatings = await this.ratingRepository.findFeaturedRatings();
      return {
        status: "success",
        payload: featuredRatings,
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const rating = await this.ratingRepository.findById(id);

      return {
        status: "success",
        payload: rating,
      };
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(id: string) {
    try {
      const rating = await this.ratingRepository.findByUserId(id);

      return {
        status: "success",
        payload: rating,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateComment(userId: string, comment: string) {
    try {
      const rating = await this.ratingRepository.findByUserId(userId);
      if (!rating) {
        throw new BadRequestError("The user has not rated.");
      }

      const updatedRating = await this.ratingRepository.updateComment(
        userId,
        comment
      );

      return {
        status: "success",
        payload: updatedRating,
      };
    } catch (error) {
      throw error;
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
        throw new BadRequestError("You must assign five valid Ids.");
      }

      const newFeaturedratings =
        await this.ratingRepository.updateFeaturedRatings(ratingIds);

      return {
        status: "success",
        payload: newFeaturedratings,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: string) {
    try {
      const deletedRating = await this.ratingRepository.deleteById(id);

      return {
        status: "success",
        payload: deletedRating,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteByUserId(userId: string) {
    try {
      const deletedRating = await this.ratingRepository.deleteByUserId(userId);

      return {
        status: "success",
        payload: deletedRating,
      };
    } catch (error) {
      throw error;
    }
  }
}
