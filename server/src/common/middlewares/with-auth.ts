import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors';

export const withAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser || req.currentUser.id || !req.currentUser.email) {
    throw new NotAuthorizedError();
  }
  next();
};
