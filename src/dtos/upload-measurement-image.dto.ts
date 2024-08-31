import { Expose, Transform } from 'class-transformer';
import { IsBase64, IsEnum, IsUUID } from 'class-validator';
import { MeasureType } from '@interfaces/measurement/measure-type';

export class UploadMeasurementImageDto {
  @IsBase64({ urlSafe: true }, { message: 'image deve ser uma base64 válida' })
  @Transform(({ value }) => value.replace(/^data:image\/\w+;base64,/, ''))
  readonly image: string;

  @IsUUID(4, { message: 'customer_code deve ser um UUID v4 válido' })
  @Expose({ name: 'customer_code' })
  readonly customerCode: string;

  @IsEnum(MeasureType, {
    message: `measure_type deve ser um dos valores: ${Object.values(MeasureType).join(', ')}`,
  })
  @Expose({ name: 'measure_type' })
  readonly measureType: MeasureType;
}
