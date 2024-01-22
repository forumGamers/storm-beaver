import { makeExecutableSchema } from "@graphql-tools/schema";
import { postTypeDefs } from "../module/post/post.typedefs";
import { userTypeDefs } from "../module/user/user.typedefs";

export default makeExecutableSchema({
  typeDefs: [postTypeDefs, userTypeDefs],
  resolvers: [],
});
