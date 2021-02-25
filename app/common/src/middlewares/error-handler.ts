import { CustomError } from 'errors/custom-error';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  return res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
