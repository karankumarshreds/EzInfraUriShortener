// all the errors will have the same structure as of this abstract class

export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
    // because we are extending built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
