import { Injectable } from '@nestjs/common';
import { Prisma, Measurement as PrismaMeasurement } from '@prisma/client';
import { MeasureType } from '@interfaces/measurement/measure-type';
import { MeasurementModel } from '@interfaces/measurement/measurement.model';
import { MeasurementRepository } from '@interfaces/measurement/measurement.repository';
import {
  CreateMeasurement,
  FindAllMeasurement,
  FindOneMeasurement,
  UpdateMeasurement,
} from '@interfaces/measurement/types';
import { PrismaService } from '@repositories/prisma.service';

@Injectable()
export class PrismaMeasurementRepository extends MeasurementRepository {
  constructor(private readonly _prismaService: PrismaService) {
    super();
  }

  public static createMeasurementModel(
    measurement: PrismaMeasurement,
  ): MeasurementModel {
    return new MeasurementModel({
      ...measurement,
      measureType: measurement.measureType as MeasureType,
    });
  }

  async create(data: CreateMeasurement): Promise<MeasurementModel> {
    const createdMeasurment = await this._prismaService.measurement.create({
      data: {
        month: data.month,
        imageUrl: data.imageUrl,
        measureType: data.measureType,
        measureValue: data.measureValue,
        customer: {
          connectOrCreate: {
            where: { id: data.customerCode },
            create: { id: data.customerCode },
          },
        },
      },
    });
    return PrismaMeasurementRepository.createMeasurementModel(
      createdMeasurment,
    );
  }

  async findOne({
    id,
    customerMonthMeasureType,
  }: FindOneMeasurement): Promise<MeasurementModel | null> {
    const where: Prisma.MeasurementWhereUniqueInput = { id };

    if (customerMonthMeasureType) {
      where.customerMonthMeasureType = {
        customerId: customerMonthMeasureType.customerCode,
        month: customerMonthMeasureType.month,
        measureType: customerMonthMeasureType.measureType,
      };
    }

    const measurement = await this._prismaService.measurement.findUnique({
      where,
    });

    if (!measurement) {
      return null;
    }

    return PrismaMeasurementRepository.createMeasurementModel(measurement);
  }

  async findAll(query: FindAllMeasurement): Promise<MeasurementModel[]> {
    const where: Prisma.MeasurementWhereInput = {};

    if (query.measureTypes) {
      where.measureType = {
        in: query.measureTypes,
      };
    }

    if (query.customerIds) {
      where.customerId = {
        in: query.customerIds,
      };
    }

    const measurements = await this._prismaService.measurement.findMany({
      where,
    });

    return measurements.map(PrismaMeasurementRepository.createMeasurementModel);
  }

  async update(id: string, data: UpdateMeasurement): Promise<MeasurementModel> {
    const updatedMeasurment = await this._prismaService.measurement.update({
      where: { id },
      data: {
        hasConfirmed: data.hasConfirmed,
        measureValue: data.measureValue,
      },
    });

    return PrismaMeasurementRepository.createMeasurementModel(
      updatedMeasurment,
    );
  }
}
