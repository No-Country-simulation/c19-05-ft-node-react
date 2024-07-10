import { NextFunction, Request, Response } from "express";
import Category from "../models/Category.model";
import Specialty from "../models/Specialty.model";

export const verifyCategoryAndSpecialty = async (req: Request, res: Response, next: NextFunction) => {
    // tomamos el body
    const {categoryId, specialtyId} = req.body;

    // consultar a la base de datos a ver si existen
    try {
        const[category, specialty] = await Promise.all([Category.findById(categoryId), Specialty.findById(specialtyId)]);
        if(!category || !specialty){
            return res.status(404).json({
                status: 'failed',
                payload: 'No category nor specialty found'
            });
        }
        return next();
    } catch (error) {
        return res.status(500).send('internal server error');
    }
}