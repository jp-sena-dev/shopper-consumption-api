import { MeasureType } from './measure-type';

export class MeasurementModel {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly measureValue: number;
  readonly measureType: MeasureType;
  readonly hasConfirmed: boolean;
  readonly imageUrl: string;
  readonly month: number;
  readonly customerId: string;

  constructor(props: MeasurementModel) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.measureValue = props.measureValue;
    this.measureType = props.measureType;
    this.hasConfirmed = props.hasConfirmed;
    this.imageUrl = props.imageUrl;
    this.month = props.month;
    this.customerId = props.customerId;
  }
}
