export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:4000";

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${apiBaseUrl}${normalizedPath}`;
}

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(apiUrl("/health"), {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Health check failed with ${response.status}`);
  }

  return response.json() as Promise<HealthResponse>;
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(apiUrl("/users"), {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Users request failed with ${response.status}`);
  }

  const payload = (await response.json()) as { users: User[] };
  return payload.users;
}

export async function createUser(input: Pick<User, "name" | "email">) {
  const response = await fetch(apiUrl("/users"), {
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  if (!response.ok) {
    throw new Error(`Create user failed with ${response.status}`);
  }

  return response.json() as Promise<{ user: User }>;
}
