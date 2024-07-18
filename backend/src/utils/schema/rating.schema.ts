import { z } from "zod";

const regexObjectId = /^[0-9a-fA-F]{24}$/;

export const RatingIdsSchema = z
  .array(
    z
      .string({ invalid_type_error: "El id debe ser un string" })
      .regex(regexObjectId, { message: "Id invalido" })
  )
  .length(5, { message: "El array debe tener exactamente 5 Ids válidos." });

export const CreateRatingSchema = z.object({
  comment: z
    .string({
      required_error: "El comentario es requerido.",
      invalid_type_error: "Tipo de dato string",
    })
    .max(120, { message: "El comentario debe contener 120 caracteres máximo" }),
});
