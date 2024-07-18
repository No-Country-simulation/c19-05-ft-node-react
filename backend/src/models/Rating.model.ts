/** @format */

import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";

export interface IRating extends Document {
  _id: Types.ObjectId;
  userId: PopulatedDoc<Types.ObjectId>;
  comment: string;
  status: boolean;
}

export type createRatingType = {
  userId: string;
  comment: string;
};

const RatingSchema: Schema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Rating = mongoose.model<IRating>("Rating", RatingSchema);

export default Rating;
