declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      GEMINI_API_KEY: string;
      AWS_S3_BUCKET_NAME: string;
      API_URL: string;
    }
  }
}

export {};
