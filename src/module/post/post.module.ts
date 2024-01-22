import { Module } from "@nestjs/common";
import { CacheService } from "../../cache/cache.service";
import { PostService } from "./post.service";
import { redisProvider } from "src/cache/cache.provider";

@Module({
  providers: [CacheService, PostService, redisProvider],
})
export class PostModule {}
