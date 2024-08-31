import { CustomerRepository } from '@interfaces/measurement/customer.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from '@repositories/prisma.service';
import { PrismaCustomerRepository } from './prisma-customer.repository';

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
