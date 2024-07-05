/** @format */

import mongoose, { Document, PopulatedDoc, Schema, Types, mongo } from "mongoose";

export interface ISpecialty extends Document {
	id: Types.ObjectId;
	name: string;
	category: PopulatedDoc<Types.ObjectId & Document>;
}

const SpecialtySchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: Types.ObjectId,
		ref: "Category",
	},
});

const Specialty = mongoose.model<ISpecialty>("Specialty", SpecialtySchema);

export default Specialty;
