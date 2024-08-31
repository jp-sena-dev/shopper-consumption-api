import { Injectable } from '@nestjs/common';
import { MeasurementRepository } from '@interfaces/measurement/measurement.repository';
import { ApiNotFoundException } from '@shared/exceptions/not-found.exception';
import { MeasurementModel } from '@interfaces/measurement/measurement.model';
import { GetCustomerMeasuresQueryDto } from '@dtos/get-customer-measures-query.dto';

@Injectable()
export class GetCustomerMesurementsUseCase {
  constructor(private readonly _measurementRepository: MeasurementRepository) {}

  async execute(
    id: string,
    query: GetCustomerMeasuresQueryDto,
  ): Promise<MeasurementModel[]> {
    const measurements = await this._measurementRepository.findAll({
      customerIds: [id],
      measureTypes: query.measureType ? [query.measureType] : undefined,
    });

    if (!measurements.length) {
      throw new ApiNotFoundException('Nenhuma leitura encontrada');
    }

    return measurements;
  }
}
