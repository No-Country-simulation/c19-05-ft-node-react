import { z } from "zod";

export const UserUpdateSchema = z.object({
    name:z.string({invalid_type_error:"El nombre debe ser un string",required_error:"El nombre es requerido"},).min(2,{message:"Minimo 2 caracteres"})
    ,description:z.string({invalid_type_error:"La descripcion debe ser un string",required_error:"La descripcion es requerida"},),
    phoneNumber:z.string({invalid_type_error:"El numero telefonico debe ser un string",required_error:"El numero telefonico es requerido"},)
})


export type UserUpdateType = z.infer<typeof UserUpdateSchema>