import { Injectable } from '@nestjs/common';
import { UploadMeasurementImageDto } from '@dtos/upload-measurement-image.dto';
import { MeasurementModel } from '@interfaces/measurement/measurement.model';
import { MeasurementRepository } from '@interfaces/measurement/measurement.repository';
import { ApiBadRequestException } from '@shared/exceptions/bad-request.exception';
import { ImageHelper } from '@shared/helpers/image.helper';
import { GenerativeAIService } from '@shared/services/generative-ai/generative-ai.service';
import { ApiConflictException } from '@shared/exceptions/conflict.exception';
import { UploadService } from '@shared/services/upload/upload.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadImageMeasurementUseCase {
  constructor(
    private readonly _imageHelper: ImageHelper,
    private readonly _generativeAIService: GenerativeAIService,
    private readonly _measurementRepository: MeasurementRepository,
    private readonly _uploadService: UploadService,
  ) {}

  async execute(data: UploadMeasurementImageDto): Promise<MeasurementModel> {
    const { format, buffer } = await this._imageHelper.getBase64Data(
      data.image,
    );
    if (!format) {
      throw new ApiBadRequestException(
        'Não foi possível obter o formato da imagem',
      );
    }

    const mimeType = this._imageHelper.getMimeFromNameOrExt(format);
    if (!mimeType || !mimeType.includes('image')) {
      throw new ApiBadRequestException('O arquivo não é uma imagem');
    }

    const month = new Date().getMonth() + 1;
    const existingMeasurement = await this._measurementRepository.findOne({
      customerMonthMeasureType: {
        customerCode: data.customerCode,
        measureType: data.measureType,
        month,
      },
    });
    if (existingMeasurement) {
      throw new ApiConflictException(
        'Já existe uma medição para o cliente e tipo de medição informados',
      );
    }

    const prompt = `Extract the ${data.measureType.toLowerCase()} measurement as an integer number from the given image. If it is not possible to get the measurement, return a message with 'ERROR'`;
    let generatedContent = '';

    try {
      generatedContent = await this._generativeAIService.generateTextFromBase64(
        prompt,
        data.image,
        mimeType,
      );
    } catch (e) {
      console.error(e);
      throw new ApiBadRequestException(
        'Não foi possível gerar o prompt para a IA, verifique sua chave e tente novamente',
      );
    }

    if (generatedContent.includes('ERROR')) {
      throw new ApiBadRequestException(
        'Não foi possível gerar o prompt para a IA',
      );
    }

    const measureValue = parseInt(generatedContent);
    if (isNaN(measureValue)) {
      throw new ApiBadRequestException(
        'Não foi possível obter o valor da medição',
      );
    }

    const ext = this._imageHelper.getExtFromMime(mimeType);
    const { url } = await this._uploadService.uploadFile(
      buffer,
      mimeType,
      `${uuid()}.${ext}`,
    );

    return this._measurementRepository.create({
      customerCode: data.customerCode,
      imageUrl: url,
      measureType: data.measureType,
      measureValue,
      month,
    });
  }
}
