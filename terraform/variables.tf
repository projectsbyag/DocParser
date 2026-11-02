variable "project_id" {
  description = "The Google Cloud project ID"
  type        = string
}

variable "region" {
  description = "GCP region for deployment"
  type        = string
  default     = "us-central1"
}

variable "service_name" {
  description = "Name of the Cloud Run microservice"
  type        = string
  default     = "docuparse-microservice"
}

variable "repository_name" {
  description = "Artifact Registry Docker repository name"
  type        = string
  default     = "docuparse-containers"
}
