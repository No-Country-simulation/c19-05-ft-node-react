/** @format */

import mongoose, { Document, PopulatedDoc, Schema, Types, mongo } from "mongoose";

type members = {
	memberOne: Types.ObjectId;
	memberTwo: Types.ObjectId;
};
type specialties = {
	specialtyOne: Types.ObjectId;
	specialtyTwo: Types.ObjectId;
};

// type comments = {
// 	userId: Types.ObjectId;
// 	comment: string;
// 	createdAt: Date;
// };

const tradeStatus = {
	accepted: "ACCEPTED",
	pending: "PENDING",
	finished: "FINISHED",
} as const;

type enumTradeStatus = (typeof tradeStatus)[keyof typeof tradeStatus];

export interface ITrade extends Document {
	id: Types.ObjectId;
	members: PopulatedDoc<members & Document>[];
	specialties: PopulatedDoc<specialties & Document>[];
	// comments: PopulatedDoc<comments & Document>[];
	expiresAt: Date;
	status: enumTradeStatus;
}

const TradeSchema: Schema = new Schema({
	members: [
		{
			memberOne: {
				type: Types.ObjectId,
				ref: "User",
			},
			memberTwo: {
				type: Types.ObjectId,
				ref: "User",
			},
		},
	],
	specialties: [
		{
			specialtyOne: {
				type: Types.ObjectId,
				ref: "Specialty",
			},
			specialtyTwo: {
				type: Types.ObjectId,
				ref: "Specialty",
			},
		},
	],
	// comments: [
	// 	{
	// 		userId: {
	// 			type: Types.ObjectId,
	// 			ref: "User",
	// 		},
	// 		comment: {
	// 			type: String,
	// 			required: true,
	// 		},
	// 		createdAt: {
	// 			type: Date,
	// 			default: Date.now,
	// 		},
	// 	},
	// ],
	expiresAt: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
		enum: ["ACCEPTED", "PENDING", "FINISHED"],
		default: "PENDING",
	},
});

const Trade = mongoose.model<ITrade>("Trade", TradeSchema);

export default Trade;
