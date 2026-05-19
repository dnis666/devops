variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "aws_region" {
  type = string
}

variable "database_secret_arn" {
  type = string
}

variable "backend_ecr_repository_arn" {
  type = string
}

variable "frontend_ecr_repository_arn" {
  type = string
}

variable "enable_github_oidc_role" {
  type = bool
}

variable "create_github_oidc_provider" {
  type = bool
}

variable "github_oidc_provider_arn" {
  type = string
}

variable "github_oidc_thumbprints" {
  type = list(string)
}

variable "github_owner" {
  type = string
}

variable "github_repo" {
  type = string
}
