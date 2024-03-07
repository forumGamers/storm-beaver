import { Injectable } from '@nestjs/common';
import {
  loadPackageDefinition,
  credentials,
  type ServiceClientConstructor,
  Metadata,
  type GrpcObject,
} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'path';
import type { GRPCUserReadService } from '../../interfaces/user.interfaces';

@Injectable()
export class UserService {
  private client: GRPCUserReadService;
  constructor() {
    const UserService = (
      loadPackageDefinition(
        loadSync(join(__dirname, '../../proto/fire-cat/index.proto'), {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        }),
      ).user as GrpcObject
    ).UserService as ServiceClientConstructor;

    this.client = new UserService(
      process.env.USER_READ_GRPC_CLIENT ?? 'localhost:50050',
      credentials.createInsecure(),
    ) as GRPCUserReadService;
  }

  public async getMultipleUsers(ids: string[], token: string) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise((resolve) => {
      this.client.GetMultipleUser({ ids }, metadata, (err, response) => {
        resolve(err ? [] : response);
      });
    });
  }

  public async me(token: string) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise((resolve) => {
      this.client.Me({}, metadata, (err, response) => {
        resolve(err ? null : response);
      });
    });
  }

  public async getFollowingRecomendation(token: string) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise((resolve) => {
      this.client.GetFollowingRecomendation({}, metadata, (err, response) => {
        resolve(err ? null : response);
      });
    });
  }

  public async getById({ id }: { id: string }, token: string) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise((resolve) => {
      this.client.GetUserById({ id }, metadata, (err, response) => {
        resolve(err ? null : response);
      });
    });
  }
}
