import { NextFunction, Request, Response } from "express";
import Category from "../models/Category.model";
import Specialty from "../models/Specialty.model";

export const verifyCategoryAndSpecialty = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: realizar la comparación entre el array de especialidades de la base de datos y el array de especialidades
    // que manda el frontend. Los que no coincidan, verificar que existan en la base de datos.
    // Si alguno de ellos es inválido o no existe, zampe un 400
    // Si todos pasan, pushee todo el array, reemplazando el que ya existe en la base de datos
    // tomamos el body
    console.log(req.body);
    
    const user = req.user!

    try {
        // consulta a la base de datos la categoría y especialidad
        // const[category, specialty] = await Promise.all([Category.findById(categoryId), Specialty.findById(specialtyId)]);
        // verifica que tanto la categoría como la especialidad existan
        // if(!category || !specialty){
        //     return res.status(404).json({
        //         status: 'failed',
        //         payload: 'No category nor specialty found'
        //     });
        // }
        // A este punto, ambos ids son válidos. Se puede pasar
        // tranquilamente al controlador
        return next();
    } catch (error) {
        return res.status(500).send('internal server error');
    }
}