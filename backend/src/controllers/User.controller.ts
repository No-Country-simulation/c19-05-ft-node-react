import { Request, Response } from "express";
import { UserService } from "../services/User.service";
import { IUser } from "../models/User.model";
import { UserUpdateType } from "../utils/schema/user.schema";


export class UserController {
    userService:UserService
    constructor( userService: UserService){
        this.userService = userService;
    }
    
     createUser = async (req:Request,res:Response) => {
        
        try {
            const result = await this.userService.verifyEmail(req.body)
            result.status == "success" ? res.send(result) 
            : res.status(409).send(result) 
            
        } catch (error) {
            console.log(error);
            if(error instanceof Error) {
                res.status(500).send(error.message)
            }else {
                res.status(500).send("Error interno")
            }
        }
    }

    confirmRegister = async (req:Request,res:Response) => {
        const {token} = req.params;
        try {
            const result = await this.userService.create(token)
            result.status == "success" ? res.send(result) 
            : res.status(409).send(result) 
        } catch (error) {
            console.log(error);
            if(error instanceof Error) {
                res.status(500).send(error.message)
            }else {
                res.status(500).send("Error interno")
            }
        }
    }


     getUsers = async (req:Request,res:Response) => {
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
            console.log(error);
            if(error instanceof Error) {
                res.status(500).send(error.message)
            }else {
                res.status(500).send("Error interno")
            }
        }
    }

     getUserAuth = async (req:Request,res:Response) => {
        // const {userId} = req.params;
        // const user:IUser = req.user!;

        // try {
        //     const result = await this.UserService.findByIdAuth(user,userId) 
        //     result.status == "success" ? res.send(result) 
        //     : res.status(400).send(result)  
        // } catch (error) {
        //                 console.log(error);
            // if(error instanceof Error) {
            //     res.status(500).send(error.message)
            // }else {
            //     res.status(500).send("Error interno")
            // }
        // }
    }

     getUser = async(req:Request,res:Response) => {
        const {userId} = req.params;
        console.log(userId);
        
        try {
            const result = await this.userService.findById(userId) 
            result.status == "success" ? res.send(result) 
            : res.status(400).send(result)  
        } catch (error) {
            console.log(error);
            if(error instanceof Error) {
                res.status(500).send(error.message)
            }else {
                res.status(500).send("Error interno")
            }
        }
    }


    // Nombre descripcion numero
     updateUser = async (req:Request,res:Response) => { 
        const {userId} = req.params;
        const data:UserUpdateType = req.body;       
        try {
            const result = await this.userService.update(userId,data);
          
            result.status == "success" ? res.send(result) 
            : res.status(400).send(result)  
            
        } catch (error) {
            console.log(error);
            if(error instanceof Error) {
                res.status(500).send(error.message)
            }else {
                res.status(500).send("Error interno")
            }
        }
    }


     delete = async (req:Request,res:Response) => { 
        const {userId} = req.params;
        try {
            const result = await this.userService.delete(userId);

            result.status == "success" ? res.send(result)

            : res.status(400).send(result);

        } catch (error) {
            
            console.log(error);
            if(error instanceof Error) {
                res.status(500).send(error.message)
            }else {
                res.status(500).send("Error interno")
            }
        }
     }
}