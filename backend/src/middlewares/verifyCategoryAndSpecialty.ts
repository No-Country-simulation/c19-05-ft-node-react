import { NextFunction, Request, Response } from "express";
import Category from "../models/Category.model";
import Specialty from "../models/Specialty.model";

type SpecialtiesType = {
    categoryId:string;
    specialtyId:string;
}

export const verifyCategoryAndSpecialty = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: realizar la comparación entre el array de especialidades de la base de datos y el array de especialidades
    // que manda el frontend. Los que no coincidan, verificar que existan en la base de datos.
    // Si alguno de ellos es inválido o no existe, zampe un 400
    // Si todos pasan, pushee todo el array, reemplazando el que ya existe en la base de datos
    // tomamos el body
    const user = req.user!
    const {specialties}:{specialties:SpecialtiesType[]} = req.body
  
    const newArray = specialties.filter(specialty =>  !user.specialties.some(specialtyOld => specialtyOld!.specialtyId.toString() === specialty.specialtyId.toString())
    );

    
    if(newArray.length === 0) {
        return next()
    }
    const arrayPromiseM = newArray.map(array => {  
        return [Category.findById(array!.categoryId),Specialty.findById(array!.specialtyId)]
    }) // verificar si ingresaron nuevas specialties. para luego separarlas y verificar si existen en db

    const arrayPromise = arrayPromiseM.flat() // aplastar el array.
   
    try {
        
        const response = await Promise.all(arrayPromise) //verificacion en la db
        
        const hasError = response.some(resp => !resp); // verificar que no hayan null's

        if (hasError) {
            return res.send({
                status: "error",
                payload: "Hubo un error en las categorías/especialidades recibidas"
            });
        }

        return next();
    } catch (error) {
        return res.status(500).send('internal server error');
    }
}