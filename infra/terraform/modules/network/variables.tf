variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "vpc_cidr" {
  type = string
}

variable "az_count" {
  type = number
}

variable "enable_nat_gateway" {
  type = bool
}

variable "backend_port" {
  type = number
}

variable "frontend_port" {
  type = number
}
