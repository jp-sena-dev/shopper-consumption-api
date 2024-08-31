import { Module } from '@nestjs/common';
import { GenerativeAIService } from './generative-ai.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Module({
  providers: [
    GenerativeAIService,
    {
      provide: GoogleGenerativeAI,
      useValue: new GoogleGenerativeAI(process.env.GEMINI_API_KEY),
    },
  ],
  exports: [GenerativeAIService],
})
export class GenerativeAIModule {}
