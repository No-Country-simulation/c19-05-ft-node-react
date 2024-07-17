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

type ParameterType = "specialties" | "interests";

export const verifyCategoryAndSpecialty = (specialtiesOrInterests:ParameterType) => async (req: Request, res: Response, next: NextFunction) => {
    // TODO: realizar la comparación entre el array de especialidades de la base de datos y el array de especialidades
    // que manda el frontend. Los que no coincidan, verificar que existan en la base de datos.
    // Si alguno de ellos es inválido o no existe, zampe un 400
    // Si todos pasan, pushee todo el array, reemplazando el que ya existe en la base de datos
    // tomamos el body
    const user = req.user!
    let checkSpecialtiesOrInterests:specialty[] = []
     if(specialtiesOrInterests === "specialties") {
        checkSpecialtiesOrInterests = req.body.specialties
     }else if (specialtiesOrInterests === "interests") {
        checkSpecialtiesOrInterests = req.body.interests
     }

    const uniqueArray = checkSpecialtiesOrInterests.reduce((accumulator:specialty[], current) => {
        const exists = accumulator.some(item => 
            item.categoryId === current.categoryId && item.specialtyId === current.specialtyId
        );
        if (!exists) {
            accumulator.push(current);
        }
        return accumulator;
    }, []); // chequeo que no vengan objetos repetidos. en caso de venir repetidos limpio el array

    if(specialtiesOrInterests === "specialties") {
        if(uniqueArray.length === 0) {
            req.body.specialties = uniqueArray
            return next()
        }
    }else  if(specialtiesOrInterests === "interests") {
        if(uniqueArray.length === 0) {
            req.body.interests = uniqueArray
            return next()
        }
    }
    const arrayPromise = uniqueArray.map(array => {  
        return Specialty.find({ _id: array.specialtyId, categoryId: array.categoryId })
    }) // verificar si ingresaron nuevas specialties. para luego separarlas y verificar si existen en db
    try {
        const response = await Promise.all(arrayPromise) //verificacion en la db 
        
        const hasError = response.some(resp => resp.length === 0
        ); // verificar que no hayan null's 
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