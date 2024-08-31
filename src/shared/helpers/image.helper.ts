import { Injectable } from '@nestjs/common';
import mime from 'mime-types';
import sharp from 'sharp';

@Injectable()
export class ImageHelper {
  async getBase64Data(image: string): Promise<{
    buffer: Buffer;
    format: string | null;
  }> {
    const buffer = Buffer.from(image, 'base64');
    const { format } = await sharp(buffer).metadata();

    return {
      buffer,
      format: format?.toString() || null,
    };
  }

  getMimeFromNameOrExt(filenameOrExt: string): string | null {
    return mime.lookup(filenameOrExt) || null;
  }
}
