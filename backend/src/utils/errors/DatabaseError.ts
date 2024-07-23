import { CustomError } from "./CustomError";

export class DatabaseError extends CustomError {
  StatusCode = 500;
  constructor() {
    super("Database has Crashed.");
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
  serialize(): { status: string; payload: string } {
    return { status: "error", payload: "Database has Crashed." };
  }
}
