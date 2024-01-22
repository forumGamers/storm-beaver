import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { config } from "dotenv";

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
