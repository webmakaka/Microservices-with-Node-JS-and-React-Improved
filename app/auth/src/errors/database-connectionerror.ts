import { CustomError } from 'errors/custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = '[Auth] Error connecting to database';

  constructor() {
    super('[Auth] Error connecting to db');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
