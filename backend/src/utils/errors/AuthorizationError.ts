import { CustomError } from "./CustomError";

export class AuthorizationError extends CustomError {
  StatusCode = 403;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
  serialize(): { status: string; payload: string } {
    return { status: "error", payload: this.message };
  }
}
