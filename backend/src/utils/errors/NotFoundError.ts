import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  StatusCode = 404;
  constructor() {
    super("Resource not found.");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serialize(): { status: string; payload: string } {
    return { status: "error", payload: "Resource not found." };
  }
}
