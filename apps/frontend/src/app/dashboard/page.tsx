import { Cpu, HardDrive, Network, ShieldCheck } from "lucide-react";
import { HealthStatusCard } from "../../components/HealthStatusCard";

export default function DashboardPage() {
  return (
    <>
      <section className="page-heading">
        <h1>Dashboard</h1>
        <p>
          Service state, infrastructure boundaries, and delivery posture for the
          portfolio environment.
        </p>
      </section>

      <div className="grid">
        <HealthStatusCard />
        <section className="card">
          <div className="card-title">
            <Network size={18} aria-hidden="true" />
            Public edge
          </div>
          <div className="metric">ALB</div>
          <p className="muted">Routes browser traffic to frontend and API paths to backend.</p>
        </section>
        <section className="card">
          <div className="card-title">
            <Cpu size={18} aria-hidden="true" />
            Compute
          </div>
          <div className="metric">2</div>
          <p className="muted">Separate Fargate services for frontend and backend containers.</p>
        </section>
        <section className="card">
          <div className="card-title">
            <HardDrive size={18} aria-hidden="true" />
            Database
          </div>
          <div className="metric">PG</div>
          <p className="muted">Backend-only network access to RDS PostgreSQL.</p>
        </section>
        <section className="card">
          <div className="card-title">
            <ShieldCheck size={18} aria-hidden="true" />
            IAM
          </div>
          <div className="metric">LP</div>
          <p className="muted">Task execution and deployment roles scoped to required actions.</p>
        </section>
      </div>
    </>
  );
}
