/** @format */

import mongoose, {
  Document,
  PopulatedDoc,
  Schema,
  Types,
  mongo,
} from "mongoose";

export interface ISpecialty extends Document {
  id: Types.ObjectId;
  name: string;
  categoryId: PopulatedDoc<Types.ObjectId & Document>;
  status: boolean;
}

const SpecialtySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Specialty = mongoose.model<ISpecialty>("Specialty", SpecialtySchema);

export default Specialty;
