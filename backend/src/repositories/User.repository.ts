import {  Types } from "mongoose";
import User, { IUser, userRating } from "../models/User.model";
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
			console.log(error)
            if(error instanceof Error) {
                throw new Error(error.message)
            }
			throw Error("Error al crear usuario")
		}
	}

	async find(query:Query | {},options:OptionsType) {
		try {
			 return await this.UserModel.paginate(query,options)
		} catch (error) {
			console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
		}
	}

	async findOne(id: string): Promise<IUser | null> {
		try {
			const result = await this.UserModel.findById(id)
			.select("_id name email description phoneNumber specialties interests userRatings trades contacts")
			.populate({path:"trades",select:"_id status members expiresAt"})
			.populate("specialties")
			.populate("contacts").lean()
			return result
		} catch (error) {
			console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
			throw Error("Error al buscar un usuario")
		}
	}

	async findByEmail(email: string): Promise<IUser | null> {
		try {
			return await this.UserModel.findOne({email}).select("_id name email description password phoneNumber specialties interests userRatings trades contacts");
		} catch (error) {
			console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
			throw Error("Error al buscar un usuario por email")
		}
	}

	async update(id:string | Types.ObjectId, data: Partial<IUser>): Promise<IUser | null> {
		try {
			return await this.UserModel.findByIdAndUpdate(id, data, { new: true });
		} catch (error) {
			console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
			throw Error("Error al actualizar un usuario")
		}
	}

	async updateTrades(id:string | Types.ObjectId, tradeId:Types.ObjectId ): Promise<IUser | null> {
		try {
			const user = await this.UserModel.findById(id)
			if(!user) return null
			user.trades.push(tradeId)
			return await user.save()
		} catch (error) {
			console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
			throw Error("Error al actualizar un usuario")
		}
	}

	async updateByEmail(email: string, data: Partial<IUser>): Promise<IUser | null> {
		try {
			return await this.UserModel.findOneAndUpdate({email}, data, { new: true });
		} catch (error) {
			console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
			throw Error("Error al actualizar un usuario")
		}
	}

	async updateRating (data:userRating) {
		
	}

	async delete(id: string): Promise<IUser | null> {
		try {
			return await this.UserModel.findByIdAndDelete(id);
		} catch (error) {
			console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
			throw Error("Error al eliminar un usuario")
		}
	}
}
