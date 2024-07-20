import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {
  StatusCode = 400;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serialize(): { status: string; message: string } {
    return { status: "error", message: this.message };
  }
}
