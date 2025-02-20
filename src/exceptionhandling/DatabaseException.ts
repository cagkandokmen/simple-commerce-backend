import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  constructor(message: string) {
    super(
      `Database error: ${message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
