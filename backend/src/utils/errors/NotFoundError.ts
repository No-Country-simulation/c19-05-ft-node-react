import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  StatusCode = 404;
  constructor() {
    super("Resource not found.");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serialize(): { status: string; message: string } {
    return { status: "error", message: "Resource not found." };
  }
}
