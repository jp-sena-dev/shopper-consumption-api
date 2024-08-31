import { Expose } from 'class-transformer';

export class UploadMeasurementEntity {
  @Expose({ name: 'measure_uuid' })
  readonly id: string;

  @Expose({ name: 'image_url' })
  readonly imageUrl: string;

  @Expose({ name: 'measure_value' })
  readonly measureValue: number;

  constructor(entity: UploadMeasurementEntity) {
    Object.assign(this, entity);
  }
}
