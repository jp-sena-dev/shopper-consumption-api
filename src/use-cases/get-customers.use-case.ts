import { Injectable } from '@nestjs/common';
import { ApiNotFoundException } from '@shared/exceptions/not-found.exception';
import { CustomerRepository } from '@interfaces/customer/customer-repository.repository';
import { CustomerModel } from '@interfaces/customer/measurement.model';

@Injectable()
export class GetCustomersUseCase {
  constructor(private readonly _customerRepositoryModule: CustomerRepository) {}

  async execute(): Promise<CustomerModel[]> {
    const measurements = await this._customerRepositoryModule.findAll();

    if (!measurements.length) {
      throw new ApiNotFoundException('Nenhuma leitura encontrada');
    }

    return measurements;
  }
}
