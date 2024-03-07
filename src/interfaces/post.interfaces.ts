import type { ServiceClient } from "@grpc/grpc-js/build/src/make-client";
import type { FileHeader, CallBack, MessageResp } from ".";
import type { Metadata } from "@grpc/grpc-js";

export interface TimeLineParams {
  userIds: string;
  page: string;
  limit: string;
}

export interface GRPCPostService extends ServiceClient {
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
