import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '@shared/enums/error-code';
import { BaseException } from './base.exception';

export class ApiNotFoundException extends BaseException {
  constructor(
    public message: string,
    public errorCode: ErrorCode = ErrorCode.MEASURE_NOT_FOUND,
  ) {
    super(message, errorCode, HttpStatus.NOT_FOUND);
  }
}
