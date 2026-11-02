terraform {
  required_version = ">= 1.5.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.30"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# 1. Enable required Google Cloud APIs
resource "google_project_service" "apis" {
  for_each = toset([
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "secretmanager.googleapis.com",
    "iam.googleapis.com",
  ])
  service            = each.key
  disable_on_destroy = false
}

# 2. Artifact Registry Docker Repository
resource "google_artifact_registry_repository" "docker_repo" {
  depends_on    = [google_project_service.apis]
  location      = var.region
  repository_id = var.repository_name
  description   = "Docker container images for DocuParse microservice"
  format        = "DOCKER"
}

# 3. Secret Manager Secret for Gemini API Key
resource "google_secret_manager_secret" "api_key" {
  depends_on = [google_project_service.apis]
  secret_id  = "gemini-api-key"

  replication {
    auto {}
  }
}

# 4. Dedicated Service Account for Cloud Run
resource "google_service_account" "runner_sa" {
  account_id   = "docuparse-runner"
  display_name = "DocuParse Cloud Run Service Account"
}

resource "google_secret_manager_secret_iam_member" "sa_secret_access" {
  secret_id = google_secret_manager_secret.api_key.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.runner_sa.email}"
}

# 5. Cloud Run (v2) Service
resource "google_cloud_run_v2_service" "docuparse" {
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = google_service_account.runner_sa.email

    scaling {
      min_instance_count = 0  # Scales to zero ($0 idle cost)
      max_instance_count = 10 # Caps scaling to control cost
    }

    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker_repo.name}/${var.service_name}:latest"

      resources {
        limits = {
          cpu    = "1000m"
          memory = "512Mi"
        }
        cpu_idle = true
      }

      env {
        name  = "NODE_ENV"
        value = "production"
      }

      env {
        name = "GEMINI_API_KEY"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.api_key.secret_id
            version = "latest"
          }
        }
      }

      liveness_probe {
        http_get {
          path = "/api/healthz"
          port = 8080
        }
        initial_delay_seconds = 5
        period_seconds        = 15
      }
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}

# 6. Allow Public Invocations
resource "google_cloud_run_v2_service_iam_member" "public_access" {
  name     = google_cloud_run_v2_service.docuparse.name
  location = google_cloud_run_v2_service.docuparse.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
