import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerativeAIService {
  private readonly model = this._googleAIService.getGenerativeModel({
    model: 'gemini-1.5-pro',
  });

  constructor(private readonly _googleAIService: GoogleGenerativeAI) {}

  async generateTextFromBase64(
    prompt: string,
    base64: string,
    mimeType: string,
  ): Promise<string> {
    const generatedContent = await this.model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType,
        },
      },
    ]);

    return generatedContent.response.text();
  }
}
