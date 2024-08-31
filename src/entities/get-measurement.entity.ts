import { Expose, Type } from 'class-transformer';
import { MeasurementEntity } from './measurement.entity';

export class GetMeasurementEntity {
  @Expose({ name: 'customer_code' })
  readonly customerCode: string;

  @Type(() => MeasurementEntity)
  readonly measures: MeasurementEntity[];

  constructor(entity: GetMeasurementEntity) {
    Object.assign(this, entity);
  }
}
