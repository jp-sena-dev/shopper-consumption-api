import { MeasureType } from '@interfaces/measurement/measure-type';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class GetCustomerMeasuresQueryDto {
  @IsEnum(MeasureType, {
    message: `measure_type deve ser um dos valores: ${Object.values(MeasureType).join(', ')}`,
  })
  @IsOptional()
  @Expose({ name: 'measure_type' })
  readonly measureType?: MeasureType;
}
