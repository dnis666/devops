import type { QueryResult } from "pg";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";
import type { Database } from "../src/database";

const fakeUsers = [
  {
    id: "1",
    name: "Ada Lovelace",
    email: "ada@example.com",
    created_at: new Date("2026-01-01T00:00:00.000Z").toISOString()
  }
];

const fakeDb: Database = {
  async query(text: string, params?: unknown[]) {
    if (text.includes("select 1")) {
      return { rows: [{ result: 1 }] } as QueryResult;
    }

    if (text.includes("select id, name, email, created_at from users")) {
      return { rows: fakeUsers } as QueryResult;
    }

    if (text.includes("insert into users")) {
      return {
        rows: [
          {
            id: "2",
            name: params?.[0],
            email: params?.[1],
            created_at: new Date("2026-01-02T00:00:00.000Z").toISOString()
          }
        ]
      } as QueryResult;
    }

    return { rows: [] } as QueryResult;
  }
};

describe("backend API", () => {
  const app = createApp(fakeDb);

  it("returns health status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("lists users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body.users).toHaveLength(1);
    expect(response.body.users[0].email).toBe("ada@example.com");
  });

  it("creates users", async () => {
    const response = await request(app).post("/users").send({
      name: "Grace Hopper",
      email: "grace@example.com"
    });

    expect(response.status).toBe(201);
    expect(response.body.user.name).toBe("Grace Hopper");
  });
});
