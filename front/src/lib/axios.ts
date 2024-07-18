import axios from 'axios';
import { isAxiosError } from 'axios';

export type errorResponseType = {
  status: string;
  message: string;
};

export const errorHandler = (error: any): errorResponseType => {
  console.log(error);
  if (isAxiosError(error) && error.response) {
    return { status: 'error', message: error.response.data.payload };
  } else if (error instanceof Error) {
    return { status: 'error', message: error.message };
  } else {
    return { status: 'error', message: String(error) };
  }
};

const api = axios.create({
  baseURL: 'http://localhost:4000/',
  withCredentials: true,
});

export default api;