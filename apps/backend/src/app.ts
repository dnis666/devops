import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response
} from "express";
import pinoHttp from "pino-http";
import { z } from "zod";
import { config } from "./config";
import { type Database, pool } from "./database";
import { logger } from "./logger";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const createUserSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180)
});

function asyncHandler(handler: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
}

export function createApp(db: Database = pool) {
  const app = express();
  const router = express.Router();

  app.use(
    pinoHttp({
      logger,
      customProps: () => ({
        service: "backend-api"
      })
    })
  );
  app.use(express.json());
  app.use(
    cors({
      origin: config.CORS_ORIGIN === "*" ? true : config.CORS_ORIGIN
    })
  );

  router.get(
    "/health",
    asyncHandler(async (_req, res) => {
      await db.query("select 1");
      res.status(200).json({
        status: "ok",
        service: "backend",
        timestamp: new Date().toISOString()
      });
    })
  );

  router.get(
    "/users",
    asyncHandler(async (_req, res) => {
      const result = await db.query(
        "select id, name, email, created_at from users order by created_at desc"
      );
      res.status(200).json({ users: result.rows });
    })
  );

  router.post(
    "/users",
    asyncHandler(async (req, res) => {
      const payload = createUserSchema.parse(req.body);
      const result = await db.query(
        `
          insert into users (name, email)
          values ($1, $2)
          on conflict (email)
          do update set name = excluded.name
          returning id, name, email, created_at
        `,
        [payload.name, payload.email]
      );

      res.status(201).json({ user: result.rows[0] });
    })
  );

  app.use("/", router);
  app.use("/api", router);

  app.use((req, res) => {
    res.status(404).json({
      error: "not_found",
      path: req.path
    });
  });

  app.use(
    (
      error: unknown,
      _req: Request,
      res: Response,
      _next: NextFunction
    ) => {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: "validation_error",
          details: error.flatten()
        });
        return;
      }

      logger.error({ err: error }, "request failed");
      res.status(500).json({
        error: "internal_server_error"
      });
    }
  );

  return app;
}
