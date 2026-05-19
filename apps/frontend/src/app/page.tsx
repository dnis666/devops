import { Cloud, Container, Database, GitBranch } from "lucide-react";
import { HealthStatusCard } from "../components/HealthStatusCard";

export default function HomePage() {
  return (
    <>
      <section className="page-heading">
        <h1>Full-stack delivery on AWS Fargate</h1>
        <p>
          A compact production workflow with Docker images, Terraform-managed AWS
          infrastructure, private PostgreSQL, and GitHub Actions deployment.
        </p>
      </section>

      <div className="grid">
        <HealthStatusCard />
        <section className="card">
          <div className="card-title">
            <Container size={18} aria-hidden="true" />
            Runtime
          </div>
          <div className="metric">ECS</div>
          <p className="muted">Fargate services behind an Application Load Balancer.</p>
        </section>
        <section className="card">
          <div className="card-title">
            <Database size={18} aria-hidden="true" />
            Data
          </div>
          <div className="metric">RDS</div>
          <p className="muted">PostgreSQL in private subnets with credentials in Secrets Manager.</p>
        </section>
        <section className="card">
          <div className="card-title">
            <GitBranch size={18} aria-hidden="true" />
            Delivery
          </div>
          <div className="metric">OIDC</div>
          <p className="muted">GitHub Actions assumes an AWS role without access keys.</p>
        </section>
        <section className="card">
          <div className="card-title">
            <Cloud size={18} aria-hidden="true" />
            Logs
          </div>
          <div className="metric">CW</div>
          <p className="muted">Backend and frontend containers stream logs to CloudWatch.</p>
        </section>
      </div>
    </>
  );
}
