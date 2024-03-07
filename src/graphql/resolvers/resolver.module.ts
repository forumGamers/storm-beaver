import { Module } from "@nestjs/common";
import { PostResolver } from "./post.resolver";
import { PostService } from "../../module/post/post.service";
import { UserService } from "../../module/user/user.service";

@Module({
  providers: [PostResolver, PostService, UserService],
  exports: [PostResolver],
})
export class ResolverModule {}
