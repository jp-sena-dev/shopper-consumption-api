import { MeasurementModel } from '@interfaces/measurement/measurement.model';
import { Expose } from 'class-transformer';

export class CustomerMeasuresEntity {
  @Expose({ name: 'customer_code' })
  readonly customerCode: string;

  readonly measures: MeasurementModel[];

  constructor(entity: CustomerMeasuresEntity) {
    Object.assign(this, entity);
  }
}
