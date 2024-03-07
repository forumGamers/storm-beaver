import { BaseContext } from "@apollo/server";

export interface GlobalContext extends BaseContext {
  access_token: string | undefined;
  verify: boolean;
}

export type CallBack<T = any> = (err: Error, response: T) => void;

export interface FileHeader {
  filename: string;
  contentType: string;
  size: number;
  header: string[];
  content: Buffer;
}

export interface MessageResp {
  message: string;
}

export interface ResolverInitiate {
  GenerateResolver(): ResolverObj;
}

export interface ResolverObj {
  Query: Record<string, any>;
  Mutation?: Record<string, any>;
  Subscription?: Record<string, any>;
}
