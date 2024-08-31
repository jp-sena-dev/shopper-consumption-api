declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      GEMINI_API_KEY: string;
    }
  }
}

export {};
