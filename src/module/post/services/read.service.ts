import { Injectable, type OnModuleInit } from '@nestjs/common';
import {
  loadPackageDefinition,
  credentials,
  type ServiceClientConstructor,
  Metadata,
  type GrpcObject,
} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'path';
import type {
  GRPCPostReadService,
  GetPostParams,
  PaginationProps,
  PaginationPropsWithUserId,
  PostRespWithMetadata,
  TopTagsResp,
} from '../../../interfaces/post.interfaces';

@Injectable()
export class NineTailsPostService implements OnModuleInit {
  private client: GRPCPostReadService;

  public onModuleInit() {
    const PostService = (
      loadPackageDefinition(
        loadSync(join(__dirname, '../../../proto/nine-tails-fox/post.proto'), {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        }),
      ).post as GrpcObject
    ).PostService as ServiceClientConstructor;

    this.client = new PostService(
      process.env.NINE_TAILS_FOX_GRPC_CLIENT ?? 'localhost:50058',
      credentials.createInsecure(),
    ) as GRPCPostReadService;
  }

  public async getTimeline(payload: GetPostParams, token: string) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise<PostRespWithMetadata>((resolve, reject) => {
      this.client.GetPublicContent(payload, metadata, (err, resp) => {
        try {
          if (err) throw err;

          resolve(resp);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  public async GetUserPost(payload: PaginationProps, token: string) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise<PostRespWithMetadata>((resolve, reject) => {
      this.client.GetUserPost(payload, metadata, (err, resp) => {
        try {
          if (err) throw err;

          resolve(resp);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  public async GetLikedPost(payload: PaginationProps, token: string) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise<PostRespWithMetadata>((resolve, reject) => {
      this.client.GetLikedPost(payload, metadata, (err, resp) => {
        try {
          if (err) throw err;

          resolve(resp);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  public async GetUserMedia(payload: PaginationProps, token: string) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise<PostRespWithMetadata>((resolve, reject) => {
      this.client.GetUserMedia(payload, metadata, (err, resp) => {
        try {
          if (err) throw err;

          resolve(resp);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  public async GetUserPostById(
    payload: PaginationPropsWithUserId,
    token: string,
  ) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise<PostRespWithMetadata>((resolve, reject) => {
      this.client.GetUserPostById(payload, metadata, (err, resp) => {
        try {
          if (err) throw err;

          resolve(resp);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  public async GetMediaByUserId(
    payload: PaginationPropsWithUserId,
    token: string,
  ) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise<PostRespWithMetadata>((resolve, reject) => {
      this.client.GetMediaByUserId(payload, metadata, (err, resp) => {
        try {
          if (err) throw err;

          resolve(resp);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  public async GetUserLikedPost(
    payload: PaginationPropsWithUserId,
    token: string,
  ) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise<PostRespWithMetadata>((resolve, reject) => {
      this.client.GetUserLikedPost(payload, metadata, (err, resp) => {
        try {
          if (err) throw err;

          resolve(resp);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  public async GetTopTags(payload: PaginationProps, token: string) {
    const metadata = new Metadata();
    metadata.add('access_token', token);

    return new Promise<TopTagsResp>((resolve, reject) => {
      this.client.GetTopTags(payload, metadata, (err, resp) => {
        try {
          if (err) throw err;

          resolve(resp);
        } catch (err) {
          reject(err);
        }
      });
    });
  }
}
