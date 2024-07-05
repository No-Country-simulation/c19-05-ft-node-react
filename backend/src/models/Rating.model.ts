/** @format */

import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";

export interface IRating extends Document {
	_id: Types.ObjectId;
	userId: PopulatedDoc<Types.ObjectId>;
	description: string;
	status: boolean;
}

const RatingSchema: Schema = new Schema({
	userId: {
		type: Types.ObjectId,
		ref: "User",
	},
	description: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		default: true,
	},
});

const Rating = mongoose.model<IRating>("Rating", RatingSchema);
