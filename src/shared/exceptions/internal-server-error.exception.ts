import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '@shared/enums/error-code';
import { BaseException } from './base.exception';

export class ApiInternalServerErrorException extends BaseException {
  constructor(
    public message: string = 'Internal server error',
    public errorCode: ErrorCode = ErrorCode.INTERNAL_ERROR,
  ) {
    super(message, errorCode, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
