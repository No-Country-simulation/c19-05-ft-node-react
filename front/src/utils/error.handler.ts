/** @format */

import { isAxiosError } from 'axios';

export function handleError(error: unknown): never {
  console.log(error);
  if (isAxiosError(error) && error.response) {
    throw new Error(error.response.data || 'An error occurred');
  } else if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error(String(error));
  }
}
