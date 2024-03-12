import { type Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { config } from 'dotenv';

config();

export const REDIS_PROVIDER = 'REDIS_CLIENT';

export const redisProvider: Provider = {
  provide: REDIS_PROVIDER,
  useFactory: () => {
    const redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASS,
    });

    redis.on('connect', () => {
      console.info(new Date().toISOString() + ' info: connect to redis');
    });

    redis.on('error', (err) => {
      console.log(`${new Date().toISOString()} error: redis:${err}`);
    });

    return redis;
  },
};
