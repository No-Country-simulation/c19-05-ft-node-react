import { z } from "zod";

/** This ensures that passwords have at least one uppercase letter, one
 * lowercase letter, one number, and one special character.
 */

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&(),.?":{}|<>])[A-Za-z\d!@#$%^&(),.?":{}|<>]+$/;

export const RegisterSchema = z
  .object({
    name: z
      .string({
        required_error: "El nombre es requerido",
        invalid_type_error: "Tipo de dato string",
      })
      .min(2, { message: "El nombre debe contener 2 caracteres minimo" }),

    email: z
      .string({
        required_error: "El email es requerido",
        invalid_type_error: "Tipo de dato string",
      })
      .email({ message: "Email no valido" }),

    password: z
      .string({
        required_error: "La contraseña es requerida",
        invalid_type_error: "Tipo de dato string",
      })
      .min(8, { message: "La contraseña debe contener 8 caracteres minimo" })
      .regex(passwordRegex, {
        message:
          "La contraseña debe contener una mayuscula, un numero y un caracter especial",
      }),
    repassword: z.string(),
    phoneNumber: z
      .string({
        required_error: "El numero de telefono es requerido",
        invalid_type_error: "Tipo de dato string",
      })
      .min(8, { message: "Ingresa lo que te corresponde." })
      .optional(),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Las contraseñas no coinciden",
    path: ["repassword"],
  });

export type RegisterType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "Tipo de dato string",
    })
    .email({ message: "Email no valido" }),
  password: z
    .string({
      required_error: "La contrase;a es requerida",
      invalid_type_error: "Tipo de dato string",
    })
    .min(8, { message: "La contraseña debe contener 8 caracteres minimo" })
    .regex(passwordRegex, {
      message:
        "La contraseña debe contener una mayuscula, un numero y un caracter especial",
    }),
});

export type LoginType = z.infer<typeof LoginSchema>;
