import { Injectable } from '@nestjs/common';
import { isMimeType } from 'class-validator';
import { v4 as uuid } from 'uuid';
import { FileData } from './types';
import * as fs from 'fs/promises';

@Injectable()
export class UploadService {
  async uploadFile(
    dataBuffer: Buffer,
    mimeType: string,
    fileName: string = uuid(),
  ): Promise<FileData> {
    if (!isMimeType(mimeType)) {
      throw new Error('Invalid mime type');
    }

    const filePath = `tmp/${fileName}`;
    await fs.writeFile(filePath, dataBuffer).catch((err) => console.error(err));

    return {
      url: `${process.env.API_URL}/files/${fileName}`,
      size: dataBuffer.byteLength,
      mimeType,
    };
  }
}
