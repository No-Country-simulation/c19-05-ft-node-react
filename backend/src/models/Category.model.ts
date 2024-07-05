/** @format */

import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";

export interface ICategory extends Document {
	_id: Types.ObjectId;
	name: string;
	status: boolean;
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
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
