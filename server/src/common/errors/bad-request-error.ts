import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;
  public error: string;
  constructor(error: string) {
    super(error);
    this.error = error;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [{ message: this.error }];
  }
}
