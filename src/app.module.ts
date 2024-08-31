import { Module } from '@nestjs/common';
import { MeasurementRepositoryModule } from '@repositories/measurement/measurement.repository.module';
import { GenerativeAIModule } from '@shared/services/generative-ai/generative-ai.module';
import { ImageHelper } from '@shared/helpers/image.helper';
import { UploadImageMeasurementUseCase } from '@use-cases/upload-image-measurement.use-case';
import { ConfirmMeasurementUseCase } from '@use-cases/confirm-measurement.use-case';
import { GetCustomerMesurementsUseCase } from '@use-cases/get-customer-measurements.use-case';
import { GetCustomersUseCase } from '@use-cases/get-customers.use-case';
import { CustomerRepositoryModule } from '@repositories/customer/customer.repository.module';
import { UploadServiceModule } from '@shared/services/upload/upload.service.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UploadServiceModule,
    GenerativeAIModule,
    MeasurementRepositoryModule,
    CustomerRepositoryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'tmp'),
      serveRoot: '/files',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ImageHelper,
    UploadImageMeasurementUseCase,
    ConfirmMeasurementUseCase,
    GetCustomerMesurementsUseCase,
    GetCustomersUseCase,
  ],
})
export class AppModule {}
