import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;
  public error: string;
  public field?: string;
  constructor(error: string, field?: string) {
    super(error);
    this.error = error;
    this.field = field;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors() {
    return [{ message: this.error, field: this.field }];
  }
}
