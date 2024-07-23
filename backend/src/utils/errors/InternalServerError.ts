import { CustomError } from "./CustomError";

export class InternalServerError extends CustomError {
  StatusCode = 500;
  constructor() {
    super("Internal server error.");
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
  serialize(): { status: string; payload: string } {
    return { status: "error", payload: "Internal server error." };
  }
}
