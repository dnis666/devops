import { Pool, type QueryResult, type QueryResultRow } from "pg";
import { config } from "./config";
import { logger } from "./logger";

export interface Database {
  query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[]
  ): Promise<QueryResult<T>>;
}

export const pool = new Pool({
  connectionString: config.DATABASE_URL,
  ssl:
    config.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false
        }
      : undefined
});

export async function initDatabase(db: Database = pool): Promise<void> {
  logger.info("checking database connectivity");
  await db.query("select 1");

  await db.query(`
    create table if not exists users (
      id bigserial primary key,
      name text not null,
      email text not null unique,
      created_at timestamptz not null default now()
    )
  `);

  logger.info("database connection established and schema is ready");
}
