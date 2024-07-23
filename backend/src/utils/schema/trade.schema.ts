import { z } from "zod";

const regexObjectId = /^[0-9a-fA-F]{24}$/;

const durationEnum = z.union([z.literal(1), z.literal(3), z.literal(7)], {
  message: "Duracion incorrecta",
});

export const TradeSchema = z.object({
  members: z.object({
    memberOne: z.object({
      id: z
        .string({ invalid_type_error: "El id debe ser un string" })
        .regex(regexObjectId, { message: "Id invalido" }),
      specialty: z
        .string({ invalid_type_error: "Tipo de dato incorrecto" })
        .regex(regexObjectId, { message: "Specialty invalido" }),
    }),
    memberTwo: z.object({
      id: z
        .string({ invalid_type_error: "El id debe ser un string" })
        .regex(regexObjectId, { message: "Id invalido" }),
      specialty: z
        .string({ invalid_type_error: "Tipo de dato incorrecto" })
        .regex(regexObjectId, { message: "Specialty invalido" }),
    }),
  }),
  duration: durationEnum,
});

export interface ResponseGetSpecialties {
  status: string;
  payload: Payload;
}

export interface Payload {
  specialties: Category[];
  categories: Specialty[];
}

export interface Category {
  _id: string;
  name: string;
  status: boolean;
  customId: number;
}

export interface Specialty {
  _id: string;
  name: string;
  status: boolean;
  categoryId: string;
}
