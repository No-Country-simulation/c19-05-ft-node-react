import api from "@/lib/axios";

export const confirmEmail = async (token: string) => {
    try {
      const response = await api(`/user/confirm-email/${token}`);
      return response;
    } catch (error) {
      throw new Error('Error confirming email');
    }
  };