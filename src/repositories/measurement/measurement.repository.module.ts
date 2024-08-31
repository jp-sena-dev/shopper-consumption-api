import { MeasurementRepository } from '@interfaces/measurement/measurement.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from '@repositories/prisma.service';
import { PrismaMeasurementRepository } from './prisma-measurement.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: MeasurementRepository,
      useClass: PrismaMeasurementRepository,
    },
  ],
  exports: [MeasurementRepository],
})
export class MeasurementRepositoryModule {}
