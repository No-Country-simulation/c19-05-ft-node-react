import { NextFunction, Request, Response } from "express";
import Category from "../models/Category.model";
import Specialty from "../models/Specialty.model";
import { specialty } from "../models/User.model";


declare global {
    namespace Express {
      interface Request {
        specialties?: specialty[] | [];
      }
    }
  }

export const verifyCategoryAndSpecialty = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: realizar la comparación entre el array de especialidades de la base de datos y el array de especialidades
    // que manda el frontend. Los que no coincidan, verificar que existan en la base de datos.
    // Si alguno de ellos es inválido o no existe, zampe un 400
    // Si todos pasan, pushee todo el array, reemplazando el que ya existe en la base de datos
    // tomamos el body
    const user = req.user!
    
    const {specialties}:{specialties:specialty[]} = req.body

    const uniqueArray = specialties.reduce((accumulator:specialty[], current) => {
        const exists = accumulator.some(item => 
            item.categoryId === current.categoryId && item.specialtyId === current.specialtyId
        );
        if (!exists) {
            accumulator.push(current);
        }
        return accumulator;
    }, []); // chequeo que no vengan objetos repetidos. en caso de venir repetidos limpio el array

    const newArray = uniqueArray.filter(specialty =>  !user.specialties.some(specialtyOld => specialtyOld!.specialtyId.toString() === specialty.specialtyId.toString())
    ); // filtro el array de especialties que ya tengo en la db y solo dejo las nuevas para luego comprobar que existan en el esquema 
    if(newArray.length === 0) {
        req.specialties = uniqueArray
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
        req.specialties = uniqueArray
        return next();
    } catch (error) {
        return res.status(500).send('internal server error');
    }
}