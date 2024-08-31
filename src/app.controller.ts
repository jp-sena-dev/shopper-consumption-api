import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UploadMeasurementImageDto } from './dtos/upload-measurement-image.dto';
import { UploadImageMeasurementUseCase } from './use-cases/upload-image-measurement.use-case';
import { UploadMeasurementEntity } from './entities/uploaded-measurement.entity';
import { ConfirmMeasurementUseCase } from '@use-cases/confirm-measurement.use-case';
import { ConfirmMeasureDto } from '@dtos/confirm-measure.dto';
import { GetCustomerMesurementsUseCase } from '@use-cases/get-customer-measurements.use-case';
import { CustomerMeasuresEntity } from '@entities/customer-measures.entity';
import { GetCustomerMeasuresQueryDto } from '@dtos/get-customer-measures-query.dto';
import { GetCustomersUseCase } from '@use-cases/get-customers.use-case';
import { ApiParseUUIDPipe } from '@shared/pipes/api-parse-uuid.pipe';
import { GetMeasurementEntity } from '@entities/get-measurement.entity';
import { MeasurementEntity } from '@entities/measurement.entity';
import { ConfirmMeasureEntity } from '@entities/confirm-measurement.entity';

@Controller()
export class AppController {
  constructor(
    private readonly _uploadImageMeasurementUseCase: UploadImageMeasurementUseCase,
    private readonly _confirmMeasurementUseCase: ConfirmMeasurementUseCase,
    private readonly _getMesurementsUseCase: GetCustomerMesurementsUseCase,
    private readonly _getCustomersUseCase: GetCustomersUseCase,
  ) {}

  @Get(':customer_code/list')
  async getCustomerMeasures(
    @Param('customer_code', ApiParseUUIDPipe) customerCode: string,
    @Query() query: GetCustomerMeasuresQueryDto,
  ): Promise<CustomerMeasuresEntity> {
    const measurements = await this._getMesurementsUseCase.execute(
      customerCode,
      query,
    );

    return new CustomerMeasuresEntity({
      customerCode: customerCode,
      measures: measurements,
    });
  }

  @Get('customers')
  async getCustomers(): Promise<GetMeasurementEntity[]> {
    const customers = await this._getCustomersUseCase.execute();

    return customers.map(
      (costumer) =>
        new GetMeasurementEntity({
          customerCode: costumer.id,
          measures: costumer.measurements.map(
            (measurement) =>
              new MeasurementEntity({
                id: measurement.id,
                measureDatetime: measurement.createdAt,
                measureType: measurement.measureType,
                hasConfirmed: measurement.hasConfirmed,
                imageUrl: measurement.imageUrl,
              }),
          ),
        }),
    );
  }

  @Post('upload')
  async upload(
    @Body() data: UploadMeasurementImageDto,
  ): Promise<UploadMeasurementEntity> {
    const createdMeasurment =
      await this._uploadImageMeasurementUseCase.execute(data);

    return new UploadMeasurementEntity({
      id: createdMeasurment.id,
      imageUrl: createdMeasurment.imageUrl,
      measureValue: createdMeasurment.measureValue,
    });
  }

  @Patch('confirm')
  async confirm(@Body() data: ConfirmMeasureDto) {
    await this._confirmMeasurementUseCase.execute(data);

    return new ConfirmMeasureEntity({
      success: true,
    });
  }
}
