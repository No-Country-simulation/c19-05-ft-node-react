import { Request, Response } from "express";
import { UserRepository } from "../repositories/User.repository";
import { UserService } from "../services/User.service";
import { IUser } from "../models/User.model";


export class UserController {
    private readonly userService:UserService
    constructor( userService: UserService){
        this.userService = userService;
    }
    
    async createUser (req:Request,res:Response) {
        
        try {
            const result = await this.userService.create(req.body)
            result.status == "success" ? res.send(result) 
            : res.status(409).send(result) 
            
        } catch (error) {
            console.log(error);
            
            res.status(500).send({error:"Error interno"})
        }
    }

    async getUsers (req:Request,res:Response) {
        const { categoryId = null } = req.params;
        let page: string | null = typeof req.query.page === 'string' ? req.query.page : null;
        if(page && isNaN(+page)){
            page = null
        }
        try {
            
            const result = await this.userService.find(categoryId,page)
            result.status == "success" ? res.send(result) 
            : res.status(500).send(result) 

        } catch (error:any) {
            if(error instanceof Error) {
                throw Error(error.message)
            }
        }
    }

    async getUserAuth(req:Request,res:Response) {
        // const {userId} = req.params;
        // const user:IUser = req.user!;

        // try {
        //     const result = await this.UserService.findByIdAuth(user,userId) 
        //     result.status == "success" ? res.send(result) 
        //     : res.status(400).send(result)  
        // } catch (error) {
        //     console.log(error)
        // }
    }

    async getUser(req:Request,res:Response) {
        const {userId} = req.params;
        try {
            const result = await this.userService.findById(userId) 
            result.status == "success" ? res.send(result) 
            : res.status(400).send(result)  
        } catch (error) {
            console.log(error)
        }
    }


    // Nombre descripcion numero
    async updateUser (req:Request,res:Response) { 
        const {userId} = req.params;
        const data = req.body;
        try {
            const result = await this.userService.update(userId,data);
            result.status == "success" ? res.send(result)
            : res.status(400).send(result);
        } catch (error) {
            console.log(error);
        }
    }


    async delete (req:Request,res:Response) { 
        const {userId} = req.params;
        try {
            const result = await this.userService.delete(userId);

            result.status == "success" ? res.send(result)

            : res.status(400).send(result);

        } catch (error) {
            
            console.log(error);
        }
     }
}