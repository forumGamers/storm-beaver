import { BaseContext } from "@apollo/server";

export interface GlobalContext extends BaseContext {
  access_token: string | undefined;
  verify: boolean;
}

export type CallBack<T = any> = (err: Error, response: T) => void;
