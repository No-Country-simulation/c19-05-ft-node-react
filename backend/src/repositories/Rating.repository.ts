import { Types } from "mongoose";
import Rating, { IRating, createRatingType } from "../models/Rating.model";

export class RatingRepository {
  constructor(private readonly RatingModel = Rating) {}

  async create(rating: createRatingType) {
    try {
      const newRating = await this.RatingModel.create(rating);
      return newRating;
    } catch (error) {
      throw error;
    }
  }

  async find() {
    try {
      const ratings = await this.RatingModel.find();
      return ratings;
    } catch (error) {
      throw error;
    }
  }

  async findFeaturedRatings() {
    try {
      const ratings = await this.RatingModel.findOne({ status: true });
      return ratings;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const rating = await this.RatingModel.findById(id);
      return rating;
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(id: string) {
    try {
      const rating = await this.RatingModel.findOne({ userId: id });
      return rating;
    } catch (error) {
      throw error;
    }
  }

  async updateComment(id: string, comment: string) {
    try {
      const rating = await this.RatingModel.findOneAndUpdate(
        { userId: id },
        { comment },
        { new: true }
      );
      return rating;
    } catch (error) {
      throw error;
    }
  }

  async updateFeaturedRatings(ratingIds: string[]) {
    try {
      await this.RatingModel.updateMany(
        {},
        { $set: { status: false } },
        { new: true }
      );

      if (ratingIds.length > 0) {
        await this.RatingModel.updateMany(
          { _id: { $in: ratingIds } },
          { $set: { status: true } }
        );
      }

      const updatedRatings = await this.RatingModel.find({
        _id: { $in: ratingIds },
      });
      return updatedRatings;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: string) {
    try {
      const rating = await this.RatingModel.findByIdAndDelete(id);
      return rating;
    } catch (error) {
      throw error;
    }
  }

  async deleteByUserId(id: string) {
    try {
      const rating = await this.RatingModel.deleteOne({ userId: id });
      return rating;
    } catch (error) {
      throw error;
    }
  }
}
