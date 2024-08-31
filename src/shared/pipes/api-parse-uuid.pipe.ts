import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { ApiBadRequestException } from '@shared/exceptions/bad-request.exception';

@Injectable()
export class ApiParseUUIDPipe extends ParseUUIDPipe {
  constructor() {
    super({
      exceptionFactory: () =>
        new ApiBadRequestException('Parâmetro posicional não é um uuid válido'),
    });
  }
}
