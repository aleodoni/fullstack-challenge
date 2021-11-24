import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 503;
  reason = 'Error connecting to database';

  constructor() {
    super('Errir connecting to database');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
