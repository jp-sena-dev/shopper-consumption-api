import { ConfirmMeasureDto } from '@dtos/confirm-measure.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { MeasurementRepository } from '@interfaces/measurement/measurement.repository';
import { ApiNotFoundException } from '@shared/exceptions/not-found.exception';
import { MeasurementModel } from '@interfaces/measurement/measurement.model';

@Injectable()
export class ConfirmMeasurementUseCase {
  constructor(private readonly _measurementRepository: MeasurementRepository) {}

  async execute(data: ConfirmMeasureDto): Promise<MeasurementModel> {
    const measurement = await this._measurementRepository.findOne({
      id: data.measureUuid,
    });

    if (!measurement) {
      throw new ApiNotFoundException('Leitura não encontrada');
    }

    if (measurement.hasConfirmed) {
      throw new ConflictException('Leitura do mês já realizada');
    }

    const updatedMesurement = await this._measurementRepository.update(
      data.measureUuid,
      {
        hasConfirmed: true,
        measureValue: data.confirmedValue,
      },
    );

    return updatedMesurement;
  }
}
