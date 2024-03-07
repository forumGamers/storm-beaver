import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import { config } from "dotenv";
import { ProducerService } from "./services/broker.service";
import { GraphqlController } from "./graphql/graphql.controller";
import { PostModule } from "./module/post/post.module";
import { UserModule } from "./module/user/user.module";
import { ResolverModule } from "./graphql/resolvers/resolver.module";

config();

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(
              (info) => `${info.timestamp} ${info.level}: ${info.message}`
            )
          ),
        }),
      ],
    }),
    PostModule,
    UserModule,
    ResolverModule,
  ],
  providers: [ProducerService],
  controllers: [GraphqlController],
})
export class AppModule {}
