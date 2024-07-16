import { Types } from "mongoose";
import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&(),.?":{}|<>])[A-Za-z\d!@#$%^&(),.?":{}|<>]+$/;
const objectIdRegex = /^[a-f\d]{24}$/i;

const CategoryAndSpecialtyIdSchema = z.object({
    categoryId:z.string({required_error: 'El id de la categoría es requerido', invalid_type_error: "Tipo de dato string"}).regex(objectIdRegex, {message: "ObjectId inválido"}),
    specialtyId:z.string({required_error: 'El id de la especialidad es requerido', invalid_type_error: "Tipo de dato string"}).regex(objectIdRegex, {message: "ObjectId inválido"}),
})
export const UserUpdateSchema = z.object({
    name:z.string({invalid_type_error:"El nombre debe ser un string",required_error:"El nombre es requerido"},).min(2,{message:"Minimo 2 caracteres"}),
    aboutme:z.object({
        teach:z.string({invalid_type_error:"La descripcion debe ser un string"},).max(255,{message:"Maximo 255 caracteres"}).optional().default(""),
        learn:z.string({invalid_type_error:"La descripcion debe ser un string"},).max(255,{message:"Maximo 255 caracteres"}).optional().default(""),
    }),
    phoneNumber:z.string({invalid_type_error:"El numero telefonico debe ser un string",required_error:"El numero telefonico es requerido"},).optional().default(""),
    specialties:z.array(
        CategoryAndSpecialtyIdSchema
    ).default([]),
    interests:z.array(
        CategoryAndSpecialtyIdSchema
    ).default([])
})

export type UserUpdateType =  {
        name: string;
        aboutme: {
            teach: string;
            learn: string;
        };
        phoneNumber: string;
        specialties: {
            categoryId: Types.ObjectId;
            specialtyId: Types.ObjectId;
        }[];
        interests: {
            categoryId: Types.ObjectId;
            specialtyId: Types.ObjectId;
        }[];
    }

export const ResetPasswordSchema = z.object({
    password:z.string({required_error:"La contraseña es requerida",invalid_type_error:"Tipo de dato string"}).min(8,{message:"La contraseña debe contener 8 caracteres minimo"}).regex(passwordRegex,{message:"La contraseña debe contener una mayuscula, un numero y un caracter especial"}),
    repassword:z.string(),
}).refine((data) => data.password === data.repassword,{
    message:"Las contraseñas no coinciden",
    path:["repassword"]
})

export const UserEmailSchema = z.object({
    email:z.string({required_error:"El email es requerido",invalid_type_error:"Tipo de dato string"}).email({message:"Email no valido"}),
})

// Esquema para verificar los ids de categoría y especialidad
