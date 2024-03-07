import { Metadata, type Client } from '@grpc/grpc-js';
import { CallBack } from '.';

export interface UserReadService extends Client {
  GetMultipleUser: (
    payload: { ids: string[] },
    metadata: Metadata,
    callBack: CallBack<User[]>,
  ) => void;

  Me: (_: {}, metadata: Metadata, callBack: CallBack<User>) => void;

  GetFollowingRecomendation: (
    _: {},
    metadata: Metadata,
    callBack: CallBack<User[]>,
  ) => void;

  GetUserById: (
    payload: { id: string },
    metadata: Metadata,
    callBack: CallBack<User>,
  ) => void;
}

export default interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  is_verified: boolean;
  bio: string;
  image_url: string;
  image_id: string;
  background_url: string;
  background_id: string;
  status: 'active' | 'nonActive';
  created_at: Date;
  updated_at: Date;
  store_id?: string;
  division?:
    | 'Director'
    | 'Finance'
    | 'IT'
    | 'Third Party'
    | 'Customer Service'
    | 'Marketing'
    | null;
  role?: 'Supervisor' | 'Manager' | 'Staff' | null;
  following: string[];
  followers: string[];
  access_token: string;
  token_as: 'User' | 'Admin' | 'Seller';
}
