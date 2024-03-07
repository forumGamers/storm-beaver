import { Module } from "@nestjs/common";
import { CacheService } from "../../cache/cache.service";
import { PostService } from "./post.service";
import { redisProvider } from "src/cache/cache.provider";
import { UserService } from "../user/user.service";

@Module({
  providers: [CacheService, PostService, redisProvider, UserService],
})
export class PostModule {}
