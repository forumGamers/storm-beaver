import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class PostResolver {
  @Query()
  public async test() {
    return {
      result: "ok",
    };
  }
}
