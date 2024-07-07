/** @format */

import mongoose, { Document, PaginateModel, PopulatedDoc, Schema, Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IUser extends Document {
	id: Types.ObjectId;
	name: string;
	email: string;
	password: string;
	specialties: PopulatedDoc<specialty & Document>[];
	interests: PopulatedDoc<specialty & Document>[];
	description: string;
	userRatings: PopulatedDoc<userRating & Document>[];
	phoneNumber: string;
	trades: PopulatedDoc<Types.ObjectId & Document>[];
	contacts: PopulatedDoc<Types.ObjectId & Document>[];
}

type specialty = {
	idCategory: Types.ObjectId;
	specialty: Types.ObjectId;
};

const numberEnum = {
	One: 1,
	Two: 2,
	Three: 3,
	Four: 4,
	Five: 5,
} as const;

type enumType = (typeof numberEnum)[keyof typeof numberEnum];

type userRating = {
	userId: Types.ObjectId;
	tradeId: Types.ObjectId;
	comment: string;
	rating: enumType;
};

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
	specialties: [
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
	interests: [
		{
			idCategory: {
				type: Types.ObjectId,
				ref: 'Category',
			},
			idSpecialty: {
				type: Types.ObjectId,
				ref: 'Specialty',
			},
		},
	],
	description: {
		type: String,
		default: 'Mi descripcion',
	},
	userRatings: [
		{
			userId: {
				type: Types.ObjectId,
				ref: 'User',
			},
			comment: {
				type: String,
			},
			rating: {
				type: Number,
				enum: [1, 2, 3, 4, 5],
			},
		},
	],
	phoneNumber: {
		type: String,
		default: '',
	},
	trades: [
		{
			type: Types.ObjectId,
			ref: 'Trade',
		},
	],
	contacts: [
		{
			type: Types.ObjectId,
			ref: 'User',
		},
	],
});

UserSchema.plugin(paginate);

interface IUserDocument extends IUser {}

// Crear el modelo con la paginación
interface IUserModel<T extends Document> extends PaginateModel<T> {}

const UserModel: IUserModel<IUserDocument> = mongoose.model<IUserDocument>('User', UserSchema) as IUserModel<IUserDocument>;

export default UserModel;
