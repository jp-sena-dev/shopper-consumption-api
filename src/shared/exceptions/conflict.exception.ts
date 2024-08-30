import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '@shared/enums/error-code';
import { BaseException } from './base.exception';

export class ApiConflictException extends BaseException {
  constructor(
    public message: string,
    public errorCode: ErrorCode = ErrorCode.CONFIRMATION_DUPLICATE,
  ) {
    super(message, errorCode, HttpStatus.CONFLICT);
  }
}
