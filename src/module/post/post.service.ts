import { Injectable } from '@nestjs/common';
import {
  loadPackageDefinition,
  credentials,
  type ServiceClientConstructor,
  Metadata,
  type GrpcObject,
} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import type { GRPCPostService } from '../../interfaces/post.interfaces';
import { join } from 'path';

@Injectable()
export class PostService {
  private client: GRPCPostService;
  constructor() {
    const Service = (
      loadPackageDefinition(
        loadSync(join(__dirname, '../../proto/octo-cats/post.proto'), {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        }),
      ).post as GrpcObject
    ).PostService as ServiceClientConstructor;

    this.client = new Service(
      process.env.OCTO_CATS_GRPC_CLIENT ?? 'localhost:50052',
      credentials.createInsecure(),
    ) as GRPCPostService;
  }

  public async getTimeline() {}
}
