import { CustomError } from "./CustomError";

export class DatabaseError extends CustomError {
  StatusCode = 500;
  constructor() {
    super("Database has Crashed.");
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
  serialize(): { status: string; message: string } {
    return { status: "error", message: "Database has Crashed." };
  }
}
