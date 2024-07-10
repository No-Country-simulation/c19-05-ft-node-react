/** @format */

import mongoose, { Document, PaginateModel, PopulatedDoc, Schema, Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

type specialty = {
	categoryId: Types.ObjectId;
	specialtyId: Types.ObjectId;
};

const numberEnum = {
	One: 1,
	Two: 2,
	Three: 3,
	Four: 4,
	Five: 5,
} as const;

export type enumType = (typeof numberEnum)[keyof typeof numberEnum];

export type userRating = {
	userId: Types.ObjectId | string;
	tradeId: Types.ObjectId | string;
	comment: string;
	rating: enumType;
};

export interface IUser extends Document {
	_id: Types.ObjectId;
	name: string;
	email: string;
	password: string;
	specialties: specialty[];
	interests: PopulatedDoc<specialty & Document>[];
	description: string;
	userRatings: userRating[];
	phoneNumber: string;
	trades: Types.ObjectId[];
	contacts: PopulatedDoc<Types.ObjectId & Document>[];
}

const UserSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	specialties: {
		type: [
			{
				categoryId: {
					type: Types.ObjectId,
					ref: 'Category',
				},
				specialtyId: {
					type: Types.ObjectId,
					ref: 'Specialty',
				},
			},
		],
		default: [],
	},
	interests: {
		type: [
			{
				categoryId: {
					type: Types.ObjectId,
					ref: 'Category',
				},
				specialtyId: {
					type: Types.ObjectId,
					ref: 'Specialty',
				},
			},
		],
		default: [],
	},
	description: {
		type: String,
		default: 'Mi descripcion',
	},
	userRatings: {
		type: [
			{
				userId: {
					type: Types.ObjectId,
					ref: 'User',
				},
				tradeId: {
					type: Types.ObjectId,
					ref: 'Trade',
				},
				comment: {
					type: String,
					default: '',
				},
				rating: {
					type: Number,
					enum: [1, 2, 3, 4, 5],
				},
			},
		],
		default: [],
	},
	phoneNumber: {
		type: String,
		default: '',
	},
	trades: {
		type: [
			{
				type: Types.ObjectId,
				ref: 'Trade',
			},
		],
		default: [],
	},
	contacts: {
		type: [
			{
				type: Types.ObjectId,
				ref: 'User',
			},
		],
		default: [],
	},
});

UserSchema.plugin(paginate);

interface IUserDocument extends IUser {}

// Crear el modelo con la paginación
interface IUserModel<T extends Document> extends PaginateModel<T> {}

const UserModel: IUserModel<IUserDocument> = mongoose.model<IUserDocument>('User', UserSchema) as IUserModel<IUserDocument>;

export default UserModel;
