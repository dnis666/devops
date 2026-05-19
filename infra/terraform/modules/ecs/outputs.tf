output "cluster_name" {
  value = aws_ecs_cluster.this.name
}

output "cluster_arn" {
  value = aws_ecs_cluster.this.arn
}

output "backend_service_name" {
  value = aws_ecs_service.backend.name
}

output "frontend_service_name" {
  value = aws_ecs_service.frontend.name
}

output "backend_service_arn" {
  value = aws_ecs_service.backend.id
}

output "frontend_service_arn" {
  value = aws_ecs_service.frontend.id
}
