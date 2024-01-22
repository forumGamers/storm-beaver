import { type Provider } from '@nestjs/common';
import Redis from 'ioredis';

export const REDIS_PROVIDER = 'REDIS_CLIENT';

export const redisProvider: Provider = {
  provide: REDIS_PROVIDER,
  useFactory: () => {
    const redis = new Redis({
      host: process.env.REDIS_HOST,
      port: 10947,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASS,
    });

    redis.on('connect', () => {
      console.log('connect to redis');
    });

    redis.on('error', (err) => {
      console.log(`error on redis : ${err}`);
    });

    return redis
  },
};
