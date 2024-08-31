import { MeasurementModel } from '@interfaces/measurement/measurement.model';

export class CustomerModel {
  readonly id: string;
  readonly measurements: MeasurementModel[];

  constructor(props: CustomerModel) {
    this.id = props.id;
    this.measurements = props.measurements;
  }
}
