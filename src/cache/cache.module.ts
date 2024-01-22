import { Module } from "@nestjs/common";
import { redisProvider } from "./cache.provider";

@Module({
  providers: [redisProvider],
})
export class CacheModule {}
