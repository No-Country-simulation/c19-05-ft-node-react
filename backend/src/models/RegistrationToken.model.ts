import mongoose, { Document, Schema } from "mongoose";

interface IRegistrationToken extends Document {
  email: string;
  createdAt: Date;
}

const RegistrationTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: "30m" },
  },
});

const RegistrationToken = mongoose.model<IRegistrationToken>(
  "RegistrationToken",
  RegistrationTokenSchema
);

export default RegistrationToken;
