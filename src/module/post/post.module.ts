import { Module } from "@nestjs/common";
import { CacheService } from "../../cache/cache.service";
import { redisProvider } from "src/cache/cache.provider";
import { UserService } from "../user/user.service";
import { NineTailsPostService } from "./services/read.service";

@Module({
  providers: [CacheService, NineTailsPostService, redisProvider, UserService],
})
export class PostModule {}
