output "database_secret_arn" {
  value = aws_secretsmanager_secret.database.arn
}

output "database_endpoint" {
  value = aws_db_instance.this.address
}

output "database_name" {
  value = aws_db_instance.this.db_name
}
