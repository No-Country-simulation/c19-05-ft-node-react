import { Request, Response } from "express";
import { AuthService } from "../services/Auth.service";
import { LoginType } from "../utils/schema/auth.schema";

export class AuthController {
    private authService:AuthService
    constructor( authService: AuthService){
        this.authService = authService;
    }
    
    login = async (req:Request,res:Response) => {
        const data:LoginType = req.body

        try {
            const result = await this.authService.login(data)
            if(result.status !== "success") {
                res.status(400).send(result)
            }else {
                res.cookie("token",result.payload,{httpOnly:true,maxAge:1000 * 60 * 60 * 24})
                res.send({
                    status:"success",
                    payload:"Login exitoso"
                })
            }
        } catch (error) {
            console.log(error);
            if(error instanceof Error) {
                res.status(500).send(error.message)
            }else {
                res.status(500).send("Error interno")
            }
        }
    }

    logout = async (req: Request, res: Response) => {
        try {
          res.clearCookie("token");
          res.sendStatus(200);
        } catch (error) {
            console.log(error);
            if(error instanceof Error) {
                res.status(500).send(error.message)
            }else {
                res.status(500).send("Error interno")
            }
        }
      };

      user = (req: Request, res: Response) => {
        try {
            res.status(200).send({
                status:"success",
                payload: req.user
            })

        } catch(error) {
            if(error instanceof Error) {
                res.status(500).send(error.message)
            }else {
                res.status(500).send("Error interno")
            }
        }
      }
}