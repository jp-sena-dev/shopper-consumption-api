import { MeasureType } from '@interfaces/measurement/measure-type';
import { Expose } from 'class-transformer';

export class MeasurementEntity {
  @Expose({ name: 'measure_uuid' })
  readonly id: string;

  @Expose({ name: 'measure_datetime' })
  readonly measureDatetime: Date;

  @Expose({ name: 'measure_type' })
  readonly measureType: MeasureType;

  @Expose({ name: 'has_confirmed' })
  readonly hasConfirmed: boolean;

  @Expose({ name: 'image_url' })
  readonly imageUrl: string;

  constructor(entity: MeasurementEntity) {
    Object.assign(this, entity);
  }
}
