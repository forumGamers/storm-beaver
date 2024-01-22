import {
  ApolloServer,
  type GraphQLRequestListener,
  type GraphQLRequestContext,
  type BaseContext,
} from '@apollo/server';
import {
  All,
  Controller,
  type OnModuleDestroy,
  type OnModuleInit,
  Req,
  Res,
  Inject,
} from '@nestjs/common';
import {
  executeHTTPGraphQLRequest,
  Raw,
  Request,
  Response,
} from '@node-libraries/nest-apollo-server';
import schema from './graphql.schema';
import type { GlobalContext } from '../interfaces';
import parseReq from '../middlewares/parsingRequest.middleware';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller()
export class GraphqlController implements OnModuleDestroy, OnModuleInit {
  private apolloServer: ApolloServer;
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  public onModuleInit() {
    const logger = (msg: string) => {
      this.logger.info(`request : ${msg}`);
    };
    this.apolloServer = new ApolloServer<BaseContext>({
      schema,
      plugins: [
        {
          async requestDidStart(
            context: GraphQLRequestContext<GlobalContext>,
          ): Promise<GraphQLRequestListener<GlobalContext> | void> {
            const { request } = context;
            if (request.operationName !== 'IntrospectionQuery')
              logger(`${request.http?.method}:${request.operationName}`);
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
    });
    return this.apolloServer.start();
  }

  public onModuleDestroy() {
    this.apolloServer.stop();
  }

  @All()
  public async graphql(@Req() req: Request, @Res() res: Response) {
    await executeHTTPGraphQLRequest({
      req,
      res,
      apolloServer: this.apolloServer,
      context: async () => {
        const rawReq = Raw(req);
        return {
          req: {
            ...rawReq,
            access_token: rawReq.headers.access_token,
            v: rawReq.headers.v === 'true',
          },
          res: Raw(res),
        };
      },
    });
  }
}
