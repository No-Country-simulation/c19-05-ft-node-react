import { Types } from "mongoose";
import { IUser } from "../models/User.model";
import { UserRepository } from "../repositories/User.repository";
import { hashPassword } from "../utils/bcrypt/bcrypt.config";
import { RegisterType } from "../utils/schema/auth.schema";

type userFilterDataType = Pick<IUser,"name"| "description" | "specialties" | "interests" |"userRatings"> & {
    phoneNumber:string|null
}

export class UserService {
    
    constructor(private readonly userRepository:UserRepository){

    }

    // ta ok.👍
    async create (user:RegisterType) {
        try {
            user.password = await hashPassword(user.password);

            const {password, ...data} = await this.userRepository.create(user)
            return {
                status:"success",
                payload:data
            }
        } catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    
    // ta ok.👍
    async find (categoryId:string,page:number) {
        const options = {
            page,
            limit:10,
            select: "name email description specialties interests"
          };
      
          const query = {
            specialties: { $elemMatch: { categoryId: new Types.ObjectId(categoryId) } }
          };
        try {
            const users = await this.userRepository.find(query,options)
            return {
                status:"success",
                payload:users
            }
        } catch (error) {
            
        }
    }
    // ta ok.👍
    async findById (user:IUser,searchedUserId:string) {
        try {

            const userFind = await this.userRepository.findOne(searchedUserId);
            if(!userFind) throw new Error("User not found");
            const result = userFind.contacts.find(contact => contact?.toString() === user.id.toString() )
            
            let userFilterData:userFilterDataType = {
                name:userFind.name,
                description:userFind.description,
                specialties:userFind.specialties,
                interests:userFind.interests,
                userRatings:userFind.userRatings,
                phoneNumber:null
            }
            if(result) {  
                userFilterData.phoneNumber = userFilterData.phoneNumber
            }
            return {
                status:"success",
                payload:userFilterData
            }
        } catch (error) {
            throw Error(error)
        }
    }

    
}