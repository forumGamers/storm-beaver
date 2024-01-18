import { Module } from "@nestjs/common";
import { PostResolver } from "./post.resolver";
import { grpcClientOptions } from "../../grpc-client.options";
import { ClientsModule } from "@nestjs/microservices";
import { POST_PACKAGE } from "../../constants/proto.constant";

Module({
  imports: [
    ClientsModule.register([
      {
        name: POST_PACKAGE,
        ...grpcClientOptions,
      },
    ]),
  ],
  providers: [PostResolver],
});
export class PostModule {}
