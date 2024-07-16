import api from "@/lib/axios";
import { Respuesta } from "@/types/user.type";
import { isAxiosError } from "axios";

export const confirmEmail = async (token: string) => {
    try {
      const {data} = await api<Respuesta>(`/api/user/confirm-email/${token}`);
      return data;
    } catch (error) {
      if(isAxiosError(error) && error.response) {
        throw new Error (error.response.data.payload)
      }
      throw new Error('Error confirming email');
    }
  };