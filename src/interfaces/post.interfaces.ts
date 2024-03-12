import type { ServiceClient } from "@grpc/grpc-js/build/src/make-client";
import type { FileHeader, CallBack, MessageResp } from ".";
import type { Metadata } from "@grpc/grpc-js";

export interface TimeLineParams {
  userIds: string;
  page: string;
  limit: string;
}

export interface GRPCPostWriteService extends ServiceClient {
  CreatePost: (
    payload: PostForm,
    metadata: Metadata,
    cb: CallBack<PostResponse>
  ) => void;
  DeletePost: (
    payload: { _id: string },
    metadata: Metadata,
    cb: CallBack<MessageResp>
  ) => void;
}

export interface PostResponse {
  _id: string;
  userId: string;
  text: string;
  media: MediaResponse[];
  allowComment: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  privacy: string;
}

export interface MediaResponse {
  id: string;
  type: string;
  url: string;
}

export interface PostForm {
  file?: FileHeader[];
  text: string;
  allowComment: boolean;
  privacy: string;
}

export interface PostDataParams {
  userIds?: string[];
  page?: number;
  limit?: number;
}

export interface GetPostParams {
  page: number;
  limit: number;
  tags: string[];
  userIds: string[];
}

export interface GRPCPostReadService extends ServiceClient {
  GetPublicContent: (
    payload: GetPostParams,
    metadata: Metadata,
    cb: CallBack<PostRespWithMetadata>
  ) => void;
  GetUserPost: (
    payload: PaginationProps,
    metadata: Metadata,
    cb: CallBack<PostRespWithMetadata>
  ) => void;
  GetLikedPost: (
    payload: PaginationProps,
    metadata: Metadata,
    cb: CallBack<PostRespWithMetadata>
  ) => void;
  GetUserMedia: (
    payload: PaginationProps,
    metadata: Metadata,
    cb: CallBack<PostRespWithMetadata>
  ) => void;
  GetUserPostById: (
    payload: PaginationPropsWithUserId,
    metadata: Metadata,
    cb: CallBack<PostRespWithMetadata>
  ) => void;
  GetMediaByUserId: (
    payload: PaginationPropsWithUserId,
    metadata: Metadata,
    cb: CallBack<PostRespWithMetadata>
  ) => void;
  GetUserLikedPost: (
    payload: PaginationPropsWithUserId,
    metadata: Metadata,
    cb: CallBack<PostRespWithMetadata>
  ) => void;
  GetTopTags: (
    payload: PaginationProps,
    metadata: Metadata,
    cb: CallBack<TopTagsResp>
  ) => void;
}

export interface PaginationProps {
  page: number;
  limit: number;
}

export interface PaginationPropsWithUserId extends PaginationProps {
  userId: string;
}

export interface PostResponse {
  _id: string;
  userId: string;
  text: string;
  media: Media[];
  allowComment: boolean;
  createdAt: string;
  updatedAr: string;
  countLike: number;
  countShare: number;
  isLiked: boolean;
  isShared: boolean;
  tags: string[];
  privacy: string;
  totalData: number;
}

export interface Media {
  id: string;
  type: string;
  url: string;
}

export interface PostRespWithMetadata {
  totalData: number;
  limit: number;
  page: number;
  totalPage: number;
  data: PostResponse[];
}

export interface TopTag {
  _id: string;
  count: number;
  posts: string[];
}

export interface TopTagsResp {
  datas: TopTag[];
}
