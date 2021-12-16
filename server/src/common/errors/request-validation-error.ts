import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  public errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super('Request validation error');
    this.errors = errors;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((err) => {
      // msg and param fields are returned in
      // object returned by express validator
      return { message: err.msg, field: err.param };
    });
  }
}
