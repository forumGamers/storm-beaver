import { PostService } from "../../module/post/post.service";
import type { ResolverInitiate } from "../../interfaces";
import { UserService } from "../../module/user/user.service";

export class PostResolver implements ResolverInitiate {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService
  ) {}

  public GenerateResolver() {
    return {
      Query: {
        getTimeLine: () => [],
      },
    };
  }
}
