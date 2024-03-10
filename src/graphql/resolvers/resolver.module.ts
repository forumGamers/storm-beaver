import { Module } from "@nestjs/common";
import { PostResolver } from "./post.resolver";
import { UserService } from "../../module/user/user.service";
import { NineTailsPostService } from "../../module/post/services/read.service";

@Module({
  providers: [PostResolver, NineTailsPostService, UserService],
  exports: [PostResolver],
})
export class ResolverModule {}
