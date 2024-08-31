import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ApiBadRequestException } from '@shared/exceptions/bad-request.exception';
import { ErrorCode } from '@shared/enums/error-code';
import { AppExceptionFilter } from '@shared/filters/http-exception.filter';

async function bootstrap() {
  const { PORT = 3000 } = process.env;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const firstError = validationErrors[0];
        return new ApiBadRequestException(
          Object.values(firstError.constraints ?? {}).join(', ') ??
            `${firstError.property} is invalid`,
          ErrorCode.INVALID_DATA,
        );
      },
    }),
  );

  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
}

bootstrap();
