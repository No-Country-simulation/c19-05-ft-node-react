/** @format */

import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";

export interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  status: boolean;
  customId: number;
}

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  customId: {
    type: Number,
    required: true,
  },
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
