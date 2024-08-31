import { Injectable } from '@nestjs/common';
import {
  Customer as PrismaCustomer,
  Measurement as PrismaMeasurement,
} from '@prisma/client';
import { PrismaService } from '@repositories/prisma.service';
import { CustomerRepository } from '@interfaces/customer/customer-repository.repository';
import { PrismaMeasurementRepository } from '@repositories/measurement/prisma-measurement.repository';
import { CustomerModel } from '@interfaces/customer/measurement.model';

@Injectable()
export class PrismaCustomerRepository extends CustomerRepository {
  constructor(private readonly _prismaService: PrismaService) {
    super();
  }

  public static createCustomerModel(
    customer: PrismaCustomer & { measurements: PrismaMeasurement[] },
  ): CustomerModel {
    return new CustomerModel({
      id: customer.id,
      measurements: customer.measurements.map((measurement) =>
        PrismaMeasurementRepository.createMeasurementModel(measurement),
      ),
    });
  }

  async findAll(): Promise<CustomerModel[]> {
    const customers = await this._prismaService.customer.findMany({
      include: { measurements: true },
    });

    return customers.map((customer) =>
      PrismaCustomerRepository.createCustomerModel(customer),
    );
  }
}
