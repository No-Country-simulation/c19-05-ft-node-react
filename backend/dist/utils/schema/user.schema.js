"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmailSchema = exports.ResetPasswordSchema = exports.UserUpdateSchema = void 0;
const zod_1 = require("zod");
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&(),.?":{}|<>])[A-Za-z\d!@#$%^&(),.?":{}|<>]+$/;
exports.UserUpdateSchema = zod_1.z.object({
    name: zod_1.z.string({ invalid_type_error: "El nombre debe ser un string", required_error: "El nombre es requerido" }).min(2, { message: "Minimo 2 caracteres" }),
    description: zod_1.z.string({ invalid_type_error: "La descripcion debe ser un string", required_error: "La descripcion es requerida" }),
    phoneNumber: zod_1.z.string({ invalid_type_error: "El numero telefonico debe ser un string", required_error: "El numero telefonico es requerido" })
});
exports.ResetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string({ required_error: "La contraseña es requerida", invalid_type_error: "Tipo de dato string" }).min(8, { message: "La contraseña debe contener 8 caracteres minimo" }).regex(passwordRegex, { message: "La contraseña debe contener una mayuscula, un numero y un caracter especial" }),
    repassword: zod_1.z.string(),
}).refine((data) => data.password === data.repassword, {
    message: "Las contraseñas no coinciden",
    path: ["repassword"]
});
exports.UserEmailSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: "El email es requerido", invalid_type_error: "Tipo de dato string" }).email({ message: "Email no valido" }),
});
