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
			const result = await this.UserModel.findById(id).select("_id name email description phoneNumber specialties interests userRatings trades contacts");
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
			return await this.UserModel.findOne({email});
		} catch (error) {
			console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
			throw Error("Error al buscar un usuario por email")
		}
	}

	async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
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
