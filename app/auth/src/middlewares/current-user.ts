import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IUserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as IUserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
