import pino from "pino";
import { config } from "./config";

export const logger = pino({
  level: config.LOG_LEVEL,
  redact: {
    paths: [
      "DATABASE_URL",
      "req.headers.authorization",
      "req.headers.cookie",
      "password",
      "*.password"
    ],
    remove: true
  }
});
