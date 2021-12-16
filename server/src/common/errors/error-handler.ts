import { Request, Response, NextFunction } from 'express';
import { CustomError } from './custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  // if error is not caught by our custom errors
  console.error(err);
  res.status(500).send({
    errors: [{ message: 'Internal Server Error ...' }],
  });
};
