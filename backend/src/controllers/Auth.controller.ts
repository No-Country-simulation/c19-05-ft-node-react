import { Request, Response } from "express";
import { AuthService } from "../services/Auth.service";
import { LoginType } from "../utils/schema/auth.schema";

export class AuthController {
    private authService: AuthService
    constructor(authService: AuthService) {
        this.authService = authService;
    }

    login = async (req: Request, res: Response) => {
        const data: LoginType = req.body

        try {
            const result = await this.authService.login(data)
            if (result.status !== "success") {
                res.status(400).send(result)
            } else {
                res.cookie("token", result.payload, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
                res.send({
                    status: "success",
                    payload: "Login exitoso"
                })
            }
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    logout = async (req: Request, res: Response) => {
        console.log("first");

        try {
            res.clearCookie("token");
            res.sendStatus(200);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    };

    user = (req: Request, res: Response) => {
        try {
            res.status(200).send({
                status: "success",
                payload: req.user
            })

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }

    google = async (req: Request, res: Response) => {
        const user = req.user

        try {
            if (!user || user.provider !== "google") {
                return res.status(403).send({
                    status: "error",
                    payload: "Error con usuario de google"
                })
            }

            const result = await this.authService.loginGoogle(user.email);

            res.cookie("token", result.payload, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
            res.send({
                status: "success",
                payload: "Login exitoso"
            })

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message)
            } else {
                res.status(500).send("Error interno")
            }
        }
    }
}