import { type ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['post'],
    protoPath: [join(__dirname, './proto/post.proto')],
  },
};
