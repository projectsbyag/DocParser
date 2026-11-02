output "service_url" {
  description = "The public URL of the deployed Cloud Run microservice"
  value       = google_cloud_run_v2_service.docuparse.uri
}

output "artifact_registry_repo" {
  description = "Artifact Registry Docker repository endpoint"
  value       = google_artifact_registry_repository.docker_repo.name
}
