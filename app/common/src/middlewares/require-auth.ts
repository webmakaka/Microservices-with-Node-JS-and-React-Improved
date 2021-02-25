import { NotAuthorizedError } from 'errors/not-authorized-error';
import { NextFunction, Request, Response } from 'express';

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
