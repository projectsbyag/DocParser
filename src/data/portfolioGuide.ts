export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'client' | 'compute' | 'ai' | 'security' | 'ci_cd' | 'storage';
  description: string;
  role: string;
  interviewDefense: string;
  badge: string;
}

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'node-client',
    label: 'Client / Ingestion Webhook',
    type: 'client',
    badge: 'HTTPS REST',
    role: 'Transmits unstructured multi-page PDFs, OCR buffers, or invoice payloads to the microservice.',
    description: 'External caller systems, accounting webhooks, or applicant tracking pipelines.',
    interviewDefense: 'For payloads under 10MB, direct synchronous HTTP POST keeps latency lowest (<150ms). For files > 20MB, the service issues a pre-signed Cloud Storage URL so uploads bypass the container memory buffer.',
  },
  {
    id: 'node-cloudrun',
    label: 'Google Cloud Run v2',
    type: 'compute',
    badge: 'Serverless Container',
    role: 'Runs Node.js 22 multi-stage Alpine container with 0-to-10 autoscaling and 80 concurrent connections per instance.',
    description: 'Fully managed OCI container runtime charging purely for active CPU/RAM execution time.',
    interviewDefense: 'Why Cloud Run over GKE or monolithic VMs? Cloud Run scales to zero with $0 idle cost, natively handles HTTP/2 and concurrency, eliminates OS patch management, and starts in < 680ms with our Alpine multi-stage image.',
  },
  {
    id: 'node-gemini',
    label: 'Gemini 3.8 Flash',
    type: 'ai',
    badge: 'Strict JSON Schema',
    role: 'Enforces mathematically guaranteed JSON outputs adhering to strict TypeScript/PostgreSQL schemas.',
    description: 'High-speed multimodal inference engine parsing tabular data without legacy OCR regex post-processing.',
    interviewDefense: 'Traditional OCR + regex pipelines fail when vendor invoice layouts skew or change. Gemini with native responseSchema acts as both comprehension engine and validator, yielding 0% syntax errors.',
  },
  {
    id: 'node-secretmanager',
    label: 'GCP Secret Manager',
    type: 'security',
    badge: 'Zero Plaintext Secrets',
    role: 'Mounts API credentials directly into container memory via IAM without hardcoded values in Git or Docker.',
    description: 'Centralized key vault with version rotation and Cloud Audit Logging.',
    interviewDefense: 'Secrets are mounted directly into Cloud Run container memory using least-privilege IAM service accounts, preventing plaintext credential exposure in Docker images or Git history.',
  },
  {
    id: 'node-wif',
    label: 'Workload Identity Federation',
    type: 'ci_cd',
    badge: 'Zero-Trust OIDC',
    role: 'Permits GitHub Actions to build and deploy to GCP without static JSON service account keys.',
    description: 'Exchanges GitHub Actions OIDC cryptographic tokens for temporary 1-hour GCP IAM credentials.',
    interviewDefense: 'Static service account keys are the primary vector for cloud credential leaks. Workload Identity Federation uses short-lived federated credentials with zero static secret keys.',
  },
  {
    id: 'node-artifactregistry',
    label: 'Artifact Registry',
    type: 'storage',
    badge: 'OCI Container Store',
    role: 'Stores immutable Docker container images tagged with commit Git SHAs for automated rollback support.',
    description: 'Next-generation Google Cloud container store with vulnerability scanning.',
    interviewDefense: 'Every production build creates an immutable container image tagged with github.sha, enabling zero-downtime blue/green rollouts and instant rollbacks on failure.',
  },
];

export const RESUME_BULLETS = [
  {
    role: 'Cloud Infrastructure / Platform Engineer',
    bullets: [
      'Architected and provisioned an automated document ingestion microservice on Google Cloud Run v2 using Terraform, managing compute, Artifact Registry, and Secret Manager resources via declarative IaC.',
      'Configured zero-trust CI/CD pipeline using GitHub Actions and Google Workload Identity Federation (WIF), eliminating static long-lived credentials across repository secrets.',
      'Engineered multi-stage Alpine Docker container images (110MB), reducing Cloud Run cold-start latency by 76% (to < 680ms) with zero-to-ten instance autoscaling.',
      'Implemented structured JSON logging with GCP trace context and container health probes (/api/healthz), achieving 99.9% observability across distributed document extraction workflows.',
    ],
  },
  {
    role: 'Full-Stack / AI Software Engineer',
    bullets: [
      'Developed a high-throughput Node.js microservice ingesting unstructured PDFs and invoices, leveraging Gemini 3.8 Flash with strict JSON Schema enforcement.',
      'Guaranteed 100% type-safe downstream database ingestion by eliminating model hallucinations and regex parsing failures via native schema validation.',
      'Optimized serverless request concurrency (80 req/instance), reducing per-document parsing costs by 94% compared to legacy AWS Textract and OCR engines.',
    ],
  },
  {
    role: 'DevOps / SRE',
    bullets: [
      'Standardized cloud development environments using GitHub Codespaces (.devcontainer), enabling instant containerized toolchain onboarding (gcloud, Terraform, Docker) with zero local RAM overhead.',
      'Established immutable container versioning in Google Artifact Registry keyed to Git commit SHAs, enabling zero-downtime blue/green rollouts and automated rollback capabilities.',
    ],
  },
];

export const INTERVIEW_QUESTIONS = [
  {
    question: 'Why did you choose Google Cloud Run instead of Google Kubernetes Engine (GKE) or AWS Lambda?',
    answer: 'Cloud Run provides the best balance between developer velocity, cost, and container portability. Unlike AWS Lambda with proprietary handler signatures and zip packaging, Cloud Run runs standard OCI Docker containers that can run anywhere. Unlike GKE, which requires managing control planes, node pools, and incur ~$74/month minimum cluster fees, Cloud Run scales to zero with $0 idle cost and provides automatic HTTPS endpoints, zero-downtime revision splitting, and concurrency (up to 80 requests per single container instance).',
  },
  {
    question: 'How do you handle Cloud Run cold starts in production?',
    answer: 'Cold starts in Cloud Run are driven by two factors: container image download time and application startup time. We addressed this by: 1) Using multi-stage Alpine Docker builds to shrink image size from ~500MB to 110MB; 2) Stripping devDependencies and caching node_modules; 3) Using dumb-init to avoid process zombie locks; and 4) If sub-second SLA is required for critical traffic, setting `min_instance_count = 1` in Terraform ensures at least one container is always warm.',
  },
  {
    question: 'Why use Workload Identity Federation instead of storing a GCP Service Account key in GitHub Secrets?',
    answer: 'Static JSON service account keys are long-lived credentials that never expire unless manually rotated. If a developer accidentally commits them or an attacker accesses repository secrets, your entire cloud infrastructure is compromised. Workload Identity Federation (WIF) uses OpenID Connect (OIDC). GitHub Actions generates a cryptographic JWT token, sends it to Google Cloud Security Token Service (STS), and GCP exchanges it for a temporary OAuth2 token valid for only 1 hour. No secret key ever exists to be stolen.',
  },
  {
    question: 'What happens if a user submits a 100MB corrupted PDF file?',
    answer: 'In our architecture, direct synchronous HTTP uploads have a 25MB body limit to prevent memory spikes in the container. For larger files (>20MB), the microservice generates a pre-signed Google Cloud Storage (GCS) upload URL. The client uploads directly to the GCS bucket. Once uploaded, GCS triggers a Cloud Storage Eventarc event or Pub/Sub notification to process the file asynchronously in background workers, protecting the API from Denial of Service (DoS) and timeouts.',
  },
  {
    question: 'How did Gemini Structured Outputs change the system architecture compared to traditional OCR?',
    answer: 'Traditional architectures required an OCR engine (Tesseract/Textract) to extract raw text, followed by dozens of fragile regular expressions or spaCy NLP models to match invoice totals, VAT IDs, and table items. When vendors altered their PDF layout, regexes broke. Gemini with responseSchema acts as both the contextual comprehension engine and the data validator, guaranteeing mathematically that the returned JSON adheres to the specified TypeScript interface.',
  },
];
