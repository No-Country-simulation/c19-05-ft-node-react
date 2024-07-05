import { Model, Types } from "mongoose";
import User, { IUser } from "../models/User.model";
import { RegisterType } from "../utils/schema/auth.schema";

type OptionsType = {
	page:number,
	limit:number,
	select:string
}

type Query = {
	specialties: {
	  $elemMatch: {
		categoryId: Types.ObjectId;
	  };
	};
  };

export class UserRepository {
	
	constructor(private readonly UserModel = User) {
		
	}

	async create(data: RegisterType): Promise<IUser> {
		try {
			const user = await this.UserModel.create(data);
			return user;
		} catch (error) {
			throw new Error(error);
		}
	}

	async find(query:Query,options:OptionsType) {
		
		try {
			 await this.UserModel.paginate(query,options)

		} catch (error) {
			throw new Error(error);
		}
	}

	async findOne(id: string): Promise<IUser | null> {
		try {
			return await this.UserModel.findById(id);
		} catch (error) {
			throw new Error(error);
		}
	}

	async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
		try {
			return await this.UserModel.findByIdAndUpdate(id, data, { new: true });
		} catch (error) {
			throw new Error(error);
		}
	}

	async delete(id: string): Promise<IUser | null> {
		try {
			return await this.UserModel.findByIdAndDelete(id);
		} catch (error) {
			throw new Error(error);
		}
	}
}
