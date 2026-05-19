module "network" {
  source = "./modules/network"

  project_name       = var.project_name
  environment        = var.environment
  vpc_cidr           = var.vpc_cidr
  az_count           = var.az_count
  enable_nat_gateway = var.enable_nat_gateway
  backend_port       = 4000
  frontend_port      = 3000
}

module "ecr" {
  source = "./modules/ecr"

  project_name = var.project_name
  environment  = var.environment
}

module "cloudwatch" {
  source = "./modules/cloudwatch"

  project_name          = var.project_name
  environment           = var.environment
  log_retention_in_days = 30
}

module "rds" {
  source = "./modules/rds"

  project_name        = var.project_name
  environment         = var.environment
  private_subnet_ids  = module.network.private_subnet_ids
  rds_security_group  = module.network.rds_security_group_id
  db_name             = var.db_name
  db_username         = var.db_username
  instance_class      = var.db_instance_class
  allocated_storage   = var.db_allocated_storage
  deletion_protection = var.db_deletion_protection
  skip_final_snapshot = var.skip_final_snapshot
}

module "iam" {
  source = "./modules/iam"

  project_name                 = var.project_name
  environment                  = var.environment
  aws_region                   = var.aws_region
  database_secret_arn          = module.rds.database_secret_arn
  backend_ecr_repository_arn   = module.ecr.backend_repository_arn
  frontend_ecr_repository_arn  = module.ecr.frontend_repository_arn
  enable_github_oidc_role      = var.enable_github_oidc_role
  create_github_oidc_provider  = var.create_github_oidc_provider
  github_oidc_provider_arn     = var.github_oidc_provider_arn
  github_oidc_thumbprints      = var.github_oidc_thumbprints
  github_owner                 = var.github_owner
  github_repo                  = var.github_repo
}

module "alb" {
  source = "./modules/alb"

  project_name          = var.project_name
  environment           = var.environment
  vpc_id                = module.network.vpc_id
  public_subnet_ids     = module.network.public_subnet_ids
  alb_security_group_id = module.network.alb_security_group_id
  backend_port          = 4000
  frontend_port         = 3000
}

module "ecs" {
  source = "./modules/ecs"

  project_name                  = var.project_name
  environment                   = var.environment
  aws_region                    = var.aws_region
  private_subnet_ids            = module.network.private_subnet_ids
  backend_security_group_id     = module.network.backend_security_group_id
  frontend_security_group_id    = module.network.frontend_security_group_id
  backend_target_group_arn      = module.alb.backend_target_group_arn
  frontend_target_group_arn     = module.alb.frontend_target_group_arn
  backend_log_group_name        = module.cloudwatch.backend_log_group_name
  frontend_log_group_name       = module.cloudwatch.frontend_log_group_name
  task_execution_role_arn       = module.iam.task_execution_role_arn
  task_role_arn                 = module.iam.task_role_arn
  database_secret_arn           = module.rds.database_secret_arn
  backend_image_uri             = module.ecr.backend_repository_url
  frontend_image_uri            = module.ecr.frontend_repository_url
  backend_desired_count         = var.backend_desired_count
  frontend_desired_count        = var.frontend_desired_count
  backend_cpu                   = var.backend_cpu
  backend_memory                = var.backend_memory
  frontend_cpu                  = var.frontend_cpu
  frontend_memory               = var.frontend_memory

  depends_on = [
    module.alb,
    module.rds
  ]
}
