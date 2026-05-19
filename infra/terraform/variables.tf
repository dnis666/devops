variable "project_name" {
  description = "Project name used to prefix AWS resources."
  type        = string
  default     = "devops-portfolio"
}

variable "environment" {
  description = "Deployment environment name."
  type        = string
  default     = "prod"
}

variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.20.0.0/16"
}

variable "az_count" {
  description = "Number of availability zones to use."
  type        = number
  default     = 2
}

variable "enable_nat_gateway" {
  description = "Create one NAT Gateway so private ECS tasks can pull images and reach AWS APIs."
  type        = bool
  default     = true
}

variable "db_name" {
  description = "Initial PostgreSQL database name."
  type        = string
  default     = "devops_portfolio"
}

variable "db_username" {
  description = "PostgreSQL master username."
  type        = string
  default     = "app_user"
}

variable "db_instance_class" {
  description = "RDS PostgreSQL instance class."
  type        = string
  default     = "db.t4g.micro"
}

variable "db_allocated_storage" {
  description = "RDS allocated storage in GB."
  type        = number
  default     = 20
}

variable "db_deletion_protection" {
  description = "Enable deletion protection for RDS."
  type        = bool
  default     = false
}

variable "skip_final_snapshot" {
  description = "Skip the final RDS snapshot on destroy."
  type        = bool
  default     = true
}

variable "backend_desired_count" {
  description = "Desired number of backend ECS tasks."
  type        = number
  default     = 1
}

variable "frontend_desired_count" {
  description = "Desired number of frontend ECS tasks."
  type        = number
  default     = 1
}

variable "backend_cpu" {
  description = "Backend Fargate CPU units."
  type        = number
  default     = 256
}

variable "backend_memory" {
  description = "Backend Fargate memory in MiB."
  type        = number
  default     = 512
}

variable "frontend_cpu" {
  description = "Frontend Fargate CPU units."
  type        = number
  default     = 256
}

variable "frontend_memory" {
  description = "Frontend Fargate memory in MiB."
  type        = number
  default     = 512
}

variable "github_owner" {
  description = "GitHub organization or username for OIDC trust."
  type        = string
  default     = ""
}

variable "github_repo" {
  description = "GitHub repository name for OIDC trust."
  type        = string
  default     = ""
}

variable "enable_github_oidc_role" {
  description = "Create a GitHub Actions deployment role."
  type        = bool
  default     = false
}

variable "create_github_oidc_provider" {
  description = "Create the GitHub OIDC identity provider in this AWS account."
  type        = bool
  default     = false
}

variable "github_oidc_provider_arn" {
  description = "Existing GitHub OIDC provider ARN. Leave empty when create_github_oidc_provider is true."
  type        = string
  default     = ""
}

variable "github_oidc_thumbprints" {
  description = "Thumbprints for token.actions.githubusercontent.com when creating the OIDC provider."
  type        = list(string)
  default     = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}
