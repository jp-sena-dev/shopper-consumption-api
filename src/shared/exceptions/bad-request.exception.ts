import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ErrorCode } from '@shared/enums/error-code';

export class ApiBadRequestException extends BaseException {
  constructor(
    public message: string,
    public errorCode: ErrorCode = ErrorCode.INVALID_DATA,
  ) {
    super(message, errorCode, HttpStatus.BAD_REQUEST);
  }
}
