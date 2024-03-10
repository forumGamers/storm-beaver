import type { GlobalContext, ResolverInitiate } from "../../interfaces";
import { UserService } from "../../module/user/user.service";
import type { PostDataParams } from "../../interfaces/post.interfaces";
import { NineTailsPostService } from "../../module/post/services/read.service";

export class PostResolver implements ResolverInitiate {
  constructor(
    private readonly postService: NineTailsPostService,
    private readonly userService: UserService
  ) {}

  public GenerateResolver() {
    return {
      Query: {
        getTimeLine: async (
          _: never,
          { query: { page, userIds, limit } }: { query: PostDataParams },
          { access_token }: GlobalContext
        ) => {
          try {
            const timeLines = await this.postService.getTimeline(
              {
                page: Number(page),
                limit: Number(limit),
                userIds: userIds.split(","),
                tags: [],
              },
              access_token
            );

            return [];
          } catch (err) {
            return [];
          }
        },
      },
    };
  }
}
