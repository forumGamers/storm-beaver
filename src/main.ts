import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { config } from "dotenv";
import { grpcClientOptions } from "./grpc-client.options";

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.connectMicroservice(grpcClientOptions);
  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();