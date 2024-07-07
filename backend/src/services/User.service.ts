import { Types } from "mongoose";
import { IUser } from "../models/User.model";
import { UserRepository } from "../repositories/User.repository";
import { hashPassword } from "../utils/bcrypt/bcrypt.config";
import { RegisterType } from "../utils/schema/auth.schema";
import {  dataRegisterJwt, generateJWTRegister } from "../utils/jwt/jwt.config";
import { Emails } from "../email/registerEmail";
import { UserUpdateType } from "../utils/schema/user.schema";

type userFilterDataType = Pick<IUser,"name"| "description" | "specialties" | "interests" |"userRatings"> & {
    phoneNumber:string|null
}

export class UserService {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    // ta ok.👍
    async verifyEmail  (user:RegisterType) {
        try {
            const userFound = await this.userRepository.findByEmail(user.email);
            if(userFound) {
                return {
                    status:"failed",
                    payload:"El correo ya esta registrado"
                }
            }
            const token = await generateJWTRegister(user)
            const data = {
                name:user.name,
                email:user.email,
                token:token
            }
            Emails.sendConfirmationEmail(data)

            return {
                status:"success",
                payload:"Para terminar tu registro verifica tu email."
            }
        } catch(error) {
            console.log(error)
            if(error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
            
        }
    }
    async create (token:string) {
        try {
            const user = dataRegisterJwt(token)
            const userFound = await this.userRepository.findByEmail(user.email);
            if(userFound) {
                return {
                    status:"failed",
                    payload:"El correo ya esta registrado"
                }
            }
            user.password = await hashPassword(user.password);
            const {password, ...data} = await this.userRepository.create(user)
            return {
                status:"success",
                payload:data
            }
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {

                throw Error(error.message)
            }

            throw new Error(String(error))
        }
    }
    
    // ta ok.👍
    async find ( categoryId:string | null, page:string | null ) {
        const options = {
            page: page ? +page : 1,
            limit:10,
            select: "name email description specialties interests"
          };
          let query = {}
          if(categoryId) {
            query = {
                specialties: { $elemMatch: { categoryId: new Types.ObjectId(categoryId) } }
              };
          }
        try {
            const users = await this.userRepository.find(query,options)
            console.log(users);
            
            return {
                status:"success",
                payload:users
            }
        } catch (error:any) {
            console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
            throw new Error(String(error))

        }
    }
    // ta ok.👍
    async findByIdAuth (user:IUser,searchedUserId:string) {
        try {
            const userFind = await this.userRepository.findOne(searchedUserId);
            if(!userFind) {
                return {
                    status:"error",
                    payload:"Usuario no encontrado"
                }
            };
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
            console.log(error)
            if(error instanceof Error) {
                throw new Error(error.message)
            }

            throw new Error(String(error))
        }
    }


    async findById (userId:string) {
        try {
            const userFind = await this.userRepository.findOne(userId);
            if(!userFind) {
                return {
                    status:"error",
                    payload:"User not found"
                }
            }
            let userFilterData:userFilterDataType = {
                name:userFind.name,
                description:userFind.description,
                specialties:userFind.specialties,
                interests:userFind.interests,
                userRatings:userFind.userRatings,
                phoneNumber:null
            }
            return {
                status:"success",
                payload:userFilterData
            }
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
            throw new Error(String(error))

        }
    }
    

    // ta ok.👍
    async update (id:string,data:UserUpdateType) {
        try {
            const user = await this.userRepository.update(id,data);
            if(user) {
                return {
                    status:"success",
                    payload:user
                }
            }else {
                return {
                    status:"error",
                    payload:"Usuario no encontrado"
                }
            }
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
            throw new Error(String(error))
            
        }
    }

    // ta ok.👍
    async delete (id:string) {
        try {
            const user = await this.userRepository.delete(id);
            if(user) {
                return {
                    status:"success",
                    payload:user
                }
            }else {
                return {
                    status:"error",
                    payload:"Usuario no encontrado"
                }
            }
        } catch (error) {
            console.log(error)
            if(error instanceof Error) {
                throw Error(error.message)
            }
            throw new Error(String(error))
            
        }
    }
    
}