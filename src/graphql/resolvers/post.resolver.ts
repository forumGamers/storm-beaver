import type { GlobalContext, ResolverInitiate } from "../../interfaces";
import { UserService } from "../../module/user/user.service";
import type { PostDataParams } from "../../interfaces/post.interfaces";
import { NineTailsPostService } from "../../module/post/services/read.service";
import { Injectable } from "@nestjs/common";
import { HelperResolver } from "./helper.resolver";

@Injectable()
export class PostResolver extends HelperResolver implements ResolverInitiate {
  constructor(
    private readonly postService: NineTailsPostService,
    private readonly userService: UserService
  ) {
    super();
  }

  public GenerateResolver() {
    return {
      Query: {
        getTimeLine: async (
          _: never,
          { query = {} }: { query: PostDataParams },
          { access_token }: GlobalContext
        ) => {
          try {
            const { page = 1, limit = 15, userIds = [] } = query;
            const { data } = await this.postService.getTimeline(
              {
                page: Number(page),
                limit: Number(limit),
                userIds,
                tags: [],
              },
              access_token
            );

            const users = await this.userService.getMultipleUsers(
              data.map((el) => el.userId),
              access_token
            );

            const result = data.map((timeline) => ({
              ...timeline,
              User: users.find((user) => user.id === timeline.userId),
            }));

            return result.map((el) => ({
              ...el,
              User: {
                ...el.User,
                UUID: el.User?.id,
                backgroundImage: el?.User?.background_url,
                imageUrl: el?.User?.image_url,
              },
            }));
          } catch (err) {
            this.LogImportantError(err);
            return [];
          }
        },
      },
    };
  }
}
