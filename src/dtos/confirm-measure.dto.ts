import { Expose } from 'class-transformer';
import { IsInt, IsUUID } from 'class-validator';

export class ConfirmMeasureDto {
  @IsUUID(4, { message: 'measure_uuid deve ser um UUID v4 válido' })
  @Expose({ name: 'measure_uuid' })
  readonly measureUuid: string;

  @IsInt({ message: 'confirmed_value deve ser um número inteiro' })
  @Expose({ name: 'confirmed_value' })
  readonly confirmedValue: number;
}
