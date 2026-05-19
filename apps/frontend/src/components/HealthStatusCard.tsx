"use client";

import { Activity, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getHealth, type HealthResponse } from "../lib/api";

type Status = "loading" | "ok" | "error";

export function HealthStatusCard() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  async function loadHealth() {
    setStatus("loading");
    try {
      const payload = await getHealth();
      setHealth(payload);
      setStatus("ok");
    } catch {
      setHealth(null);
      setStatus("error");
    }
  }

  useEffect(() => {
    void loadHealth();
  }, []);

  const label =
    status === "ok" ? "Healthy" : status === "loading" ? "Checking" : "Down";

  return (
    <section className="card">
      <div className="card-title">
        <Activity size={18} aria-hidden="true" />
        API health
      </div>
      <div className="status">
        <span
          className={`status-dot ${
            status === "ok" ? "ok" : status === "error" ? "error" : "warn"
          }`}
        />
        {label}
      </div>
      <p className="muted">
        {health
          ? `${health.service} responded at ${new Date(
              health.timestamp
            ).toLocaleTimeString()}`
          : "Waiting for the backend health endpoint."}
      </p>
      <button className="button" onClick={() => void loadHealth()}>
        <RefreshCw size={16} aria-hidden="true" />
        Refresh
      </button>
    </section>
  );
}
