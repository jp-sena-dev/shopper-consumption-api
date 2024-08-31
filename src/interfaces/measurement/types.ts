import { MeasureType } from './measure-type';

export interface CreateMeasurement {
  imageUrl: string;
  customerCode: string;
  month: number;
  measureType: MeasureType;
  measureValue: number;
}

export interface FindOneMeasurement {
  id?: string;
  customerMonthMeasureType?: {
    customerCode: string;
    measureType: MeasureType;
    month: number;
  };
}

export interface UpdateMeasurement {
  hasConfirmed: boolean;
  measureValue: number;
}

export interface FindAllMeasurement {
  customerIds?: string[];
  measureTypes?: MeasureType[];
}
