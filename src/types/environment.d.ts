export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENCRYPTION_KEY: string;
      PORT: string;
      RABBIT_MQ_URL: string;
      REDIS_HOST: string;
      REDIS_PASS: string;
      REDIS_PORT: string;
      REDIS_USERNAME: string;
      USER_READ_GRPC_CLIENT: string;
      OCTO_CATS_GRPC_CLIENT: string;
      NODE_ENV: "development" | "test" | "production";
    }
  }
}
