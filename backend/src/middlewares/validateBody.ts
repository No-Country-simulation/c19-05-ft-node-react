import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const middlewareBody = (schema: ZodSchema) => async (req:Request,res:Response, next:NextFunction) => {
    try {
        
        await schema.parse(req.body)
        next()
    } catch (error) {
        console.log("hola");
        if(error instanceof ZodError) {
            const errorDetails = error.errors.map((error) => ({
                path:error.path.join("."),
                error:error.message
            }) )

            return res.status(400).send(errorDetails)
        }else if (error instanceof Error) {
            return res.status(400).send({error:error.message})
        }
    }
} 