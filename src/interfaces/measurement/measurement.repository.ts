import { MeasurementModel } from './measurement.model';
import {
  CreateMeasurement,
  FindAllMeasurement,
  FindOneMeasurement,
  UpdateMeasurement,
} from './types';

export abstract class MeasurementRepository {
  abstract create(data: CreateMeasurement): Promise<MeasurementModel>;
  abstract findOne(query: FindOneMeasurement): Promise<MeasurementModel | null>;
  abstract findAll(query: FindAllMeasurement): Promise<MeasurementModel[]>;
  abstract update(
    id: string,
    data: UpdateMeasurement,
  ): Promise<MeasurementModel>;
}
