export abstract class CustomError extends Error {
  constructor(public message: string) {
    super(message);
  }
  abstract StatusCode: number;
  abstract serialize(): { status: string; payload: string };
}
