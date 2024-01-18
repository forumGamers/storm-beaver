import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import {
  type GraphQLRequestListener,
  type GraphQLRequestContext,
} from '@apollo/server';
import { GlobalContext } from './interfaces';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PostModule } from './module/post/post.module';
import { PostResolver } from './module/post/post.resolver';
import { PostTypeDefs } from './module/post/post.typedefs';
import parseReq from './middlewares/parsingRequest.middleware'
import { config } from "dotenv";
import { ProducerService } from './services/broker.service';

config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typeDefs:[PostTypeDefs],
      installSubscriptionHandlers: true,
      introspection: true,
      playground:true,
      context: ({ req }) => ({
        access_token: req.headers?.access_token,
        verify: req.headers.v === 'true',
      }),
      plugins: [
        {
          async requestDidStart(
            context: GraphQLRequestContext<GlobalContext>,
          ): Promise<GraphQLRequestListener<GlobalContext> | void> {
            return {
              async didResolveOperation(
                requestContext: GraphQLRequestContext<GlobalContext>,
              ) {
                await parseReq(requestContext);
              },
            };
          },
        },
      ],
      autoTransformHttpErrors:true,
      
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(
              (info) => `${info.timestamp} ${info.level}: ${info.message}`,
            ),
          ),
        }),
      ],
    }),
    PostModule
  ],
  providers:[PostResolver,ProducerService]
})
export class AppModule {}
