import { Request, Response } from "express";
import { UserService } from "../services/User.service";
import { enumType } from "../models/User.model";
import { UserUpdateType } from "../utils/schema/user.schema";


export class UserController {
    userService: UserService
    constructor(userService: UserService) {
        this.userService = userService;
    }

    createUser = async (req: Request, res: Response) => {

        try {
            const result = await this.userService.verifyEmail(req.body)
            
            result.status === "success" ? res.send(result)
                : res.status(404).send(result)

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    confirmRegister = async (req: Request, res: Response) => {
        const { token } = req.params;
        
        try {
            const result = await this.userService.create(token)          
            result.status == "success" ? res.send(result)
                : res.status(409).send(result)
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    sendResetPasswordToken = async (req: Request, res: Response) => {
        const { email } = req.body;
        try {
            const result = await this.userService.resetEmail(email)
            result.status == "success" ? res.send(result)
                : res.status(400).send(result)
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    resetPassword = async (req: Request, res: Response) => {
        const { token } = req.params;
        const { password } = req.body;
        try {
            const result = await this.userService.updatePassword({token, password});

            result.status == "success" ? res.send(result)
                : res.status(409).send(result)
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send("Error interno");
            }
        }
    }

    getUsers = async (req: Request, res: Response) => {
        const { categoryId = null } = req.params;
        let page: string | null = typeof req.query.page === 'string' ? req.query.page : null;
        if (page && isNaN(+page)) {
            page = null
        }
        try {
            const result = await this.userService.find(categoryId, page)
            result.status == "success" ? res.send(result)
                : res.status(500).send(result)
        } catch (error: any) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    getUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const user = req.user;
        try {

           const result = await this.userService.findById(user, userId)
            console.log(result);
            
            result.status == "success" ? res.send(result)
                : res.status(400).send(result)
        } catch (error) {
            console.log("hola error");
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }


    // Nombre descripcion numero
    updateUser = async (req: Request, res: Response) => {
        
        const data: UserUpdateType = req.body;
        try {
            const result = await this.userService.update(req.user!._id, data);

            result.status == "success" ? res.send(result)
                : res.status(400).send(result)

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    updateUserRating = async (req: Request, res: Response) => {
        const { userId:CarlosID , tradeId } = req.params;
        const {comment = "",rating}:{comment:string | undefined,rating:enumType} = req.body;
        const userId = req.user!._id
        try {
            const result = await this.userService.updateRating({userId,tradeId,comment,rating},req.user!)

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }


    delete = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try {
            const result = await this.userService.delete(userId);

            result.status == "success" ? res.send(result)

                : res.status(400).send(result);

        } catch (error) {

            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    updatePick = async (req: Request, res: Response) => {
        const photo = req.file;
        try {
          if (!photo || photo === undefined) {
            return res.status(400).send({ status: false, payload: 'No se envio ningun archivo' });
          }
          const { status, payload } = await this.userService.updatePick(req.user!, photo!);
          res.send({ status, payload: 'Perfil actualizado' });
        } catch (error) {
          console.log(error);
          if (error instanceof Error) {
            res.status(400).send({ status: false, payload: error.message });
          }
          res.status(500).send({ status: false, payload: 'Error interno' });
        }
      };
}