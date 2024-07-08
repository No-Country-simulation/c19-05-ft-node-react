import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&(),.?":{}|<>])[A-Za-z\d!@#$%^&(),.?":{}|<>]+$/;

export const UserUpdateSchema = z.object({
    name:z.string({invalid_type_error:"El nombre debe ser un string",required_error:"El nombre es requerido"},).min(2,{message:"Minimo 2 caracteres"})
    ,description:z.string({invalid_type_error:"La descripcion debe ser un string",required_error:"La descripcion es requerida"},),
    phoneNumber:z.string({invalid_type_error:"El numero telefonico debe ser un string",required_error:"El numero telefonico es requerido"},)
})

export type UserUpdateType = z.infer<typeof UserUpdateSchema>

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