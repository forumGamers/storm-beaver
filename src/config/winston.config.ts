import * as winston from "winston";
import { WinstonModuleOptions } from "nest-winston";

export const WinstonOptions: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
};
