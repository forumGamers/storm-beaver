import { makeExecutableSchema } from "@graphql-tools/schema";
import { postTypeDefs } from "../module/post/post.typedefs";
import { userTypeDefs } from "../module/user/user.typedefs";
import { postResolver } from "../module/post/post.resolver";

export default makeExecutableSchema({
  typeDefs: [postTypeDefs, userTypeDefs],
  resolvers: [postResolver],
});
