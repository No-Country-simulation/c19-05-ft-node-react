import { Types } from "mongoose";
import { z } from "zod";

export const CreateMessageSchema = z.object({
  senderId: z
    .string({
      required_error: "senderId must be required",
      invalid_type_error: "must be of type string",
    })
    .refine((value) => Types.ObjectId.isValid(value), {
      message: "Invalid ObjectId",
    }),
  receiverId: z
    .string({
      required_error: "receiveId must be required",
      invalid_type_error: "must be of type string",
    })
    .refine((value) => Types.ObjectId.isValid(value), {
      message: "Invalid ObjectId",
    }),
  message: z.string({
    required_error: "Message must be required",
    invalid_type_error: "must be of type string",
  }),

  chatRoomId: z
    .string({
      required_error: "chatRoom must be required",
      invalid_type_error: "must be of type string",
    })
    .refine((value) => Types.ObjectId.isValid(value), {
      message: "Invalid ObjectId",
    }),
});

export type MessageCreateType = z.infer<typeof CreateMessageSchema>;
