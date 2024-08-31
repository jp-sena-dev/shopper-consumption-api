import { CustomerModel } from './measurement.model';

export abstract class CustomerRepository {
  abstract findAll(): Promise<CustomerModel[]>;
}
