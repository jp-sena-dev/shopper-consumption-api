import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { BaseException } from '@shared/exceptions/base.exception';
import { ApiInternalServerErrorException } from '@shared/exceptions/internal-server-error.exception';
import { ExceptionResponse } from '@shared/responses/exception.response';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: BaseException | Error, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();

    let exceptionObject: BaseException;

    if (exception instanceof BaseException) {
      exceptionObject = exception;
    } else {
      console.error(exception);
      exceptionObject = new ApiInternalServerErrorException();
    }

    const serializedResponse = new ExceptionResponse(exceptionObject);

    response
      .status(exceptionObject.statusCode)
      .json(instanceToPlain(serializedResponse));
  }
}
