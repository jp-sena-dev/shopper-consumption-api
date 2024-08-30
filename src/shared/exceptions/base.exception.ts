import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '@shared/enums/error-code';

export class BaseException {
  constructor(
    public message: string,
    public errorCode: ErrorCode,
    public statusCode: HttpStatus,
  ) {}
}
