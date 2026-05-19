import "dotenv/config";
import { createServer } from "node:http";
import { createApp } from "./app";
import { config } from "./config";
import { initDatabase, pool } from "./database";
import { logger } from "./logger";

async function bootstrap() {
  logger.info(
    {
      env: config.NODE_ENV,
      port: config.PORT
    },
    "starting backend service"
  );

  await initDatabase(pool);

  const server = createServer(createApp(pool));

  server.listen(config.PORT, () => {
    logger.info(
      {
        port: config.PORT
      },
      "backend service is listening"
    );
  });

  const shutdown = async (signal: string) => {
    logger.info({ signal }, "shutting down backend service");
    server.close(async () => {
      await pool.end();
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => void shutdown("SIGTERM"));
  process.on("SIGINT", () => void shutdown("SIGINT"));
}

bootstrap().catch((error) => {
  logger.fatal({ err: error }, "backend failed to start");
  process.exit(1);
});
