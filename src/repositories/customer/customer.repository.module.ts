import { Module } from '@nestjs/common';
import { PrismaService } from '@repositories/prisma.service';
import { PrismaCustomerRepository } from './prisma-customer.repository';
import { CustomerRepository } from '@interfaces/customer/customer-repository.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
  ],
  exports: [CustomerRepository],
})
export class CustomerRepositoryModule {}
