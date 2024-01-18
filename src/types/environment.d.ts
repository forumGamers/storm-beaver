export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENCRYPTION_KEY: string;
      PORT: string;
      RABBIT_MQ_URL: string;
    }
  }
}
