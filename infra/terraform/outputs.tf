output "alb_dns_name" {
  description = "Public Application Load Balancer DNS name."
  value       = module.alb.alb_dns_name
}

output "alb_public_url" {
  description = "Public URL for the Application Load Balancer."
  value       = module.alb.alb_public_url
}

output "backend_ecr_repository_url" {
  description = "Backend ECR repository URL."
  value       = module.ecr.backend_repository_url
}

output "frontend_ecr_repository_url" {
  description = "Frontend ECR repository URL."
  value       = module.ecr.frontend_repository_url
}

output "ecs_cluster_name" {
  description = "ECS cluster name."
  value       = module.ecs.cluster_name
}

output "backend_service_name" {
  description = "Backend ECS service name."
  value       = module.ecs.backend_service_name
}

output "frontend_service_name" {
  description = "Frontend ECS service name."
  value       = module.ecs.frontend_service_name
}

output "backend_log_group_name" {
  description = "Backend CloudWatch log group."
  value       = module.cloudwatch.backend_log_group_name
}

output "frontend_log_group_name" {
  description = "Frontend CloudWatch log group."
  value       = module.cloudwatch.frontend_log_group_name
}

output "database_secret_arn" {
  description = "Secrets Manager ARN containing the PostgreSQL connection details."
  value       = module.rds.database_secret_arn
  sensitive   = true
}

output "github_actions_role_arn" {
  description = "GitHub Actions deployment role ARN when enabled."
  value       = module.iam.github_actions_role_arn
}
