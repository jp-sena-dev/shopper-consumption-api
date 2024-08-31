import { Exclude, Expose } from 'class-transformer';
import { ErrorCode } from '@shared/enums/error-code';
import { BaseException } from '@shared/exceptions/base.exception';

export class ExceptionResponse implements BaseException {
  @Expose({ name: 'error_description' })
  public readonly message: string;

  @Expose({ name: 'error_code' })
  public readonly errorCode: ErrorCode;

  @Exclude()
  public readonly statusCode: number;

  constructor(exceptionResponse: ExceptionResponse) {
    Object.assign(this, exceptionResponse);
  }
}
