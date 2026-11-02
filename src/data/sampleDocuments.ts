export interface SampleDocument {
  id: string;
  name: string;
  type: 'invoice' | 'resume';
  description: string;
  category: string;
  content: string;
}

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: 'messy-invoice-1',
    name: 'Acme Cloud Services - Invoice #INV-2024-8849',
    type: 'invoice',
    category: 'Vendor Invoice (Unstructured OCR)',
    description: 'Messy OCR output with inconsistent whitespace, multiline tables, taxes, and PO numbers.',
    content: `=====================================================
            *** TAX INVOICE / BILLING NOTICE ***
=====================================================
Apex Cloud Solutions LLC
100 Silicon Way, Suite 400
San Francisco, CA 94105
Tax Reg / EIN: EIN-84-2910394
Support: billing@apexcloud.io | (415) 555-0199

BILL TO:
Meridian Global Enterprises
Attn: Accounts Payable / Cloud Ops
450 Lexington Ave, 18th Floor
New York, NY 10017
Client ID: MGE-99214
PO Reference: PO-CLOUD-2024-771

INVOICE DETAILS:
-----------------------------------------------------
Invoice No:    INV-2024-8849
Invoice Date:  October 14, 2024
Due Date:      November 13, 2024
Payment Terms: Net 30
Currency:      USD ($)

DESCRIPTION OF SERVICES / DELIVERABLES:
[1] Cloud Infrastructure Architecture Review & Terraform Migration
    Qty: 40 hrs  @ $175.00/hr .................... $7,000.00
    - Migrated legacy manual GCP deployments to modular Terraform
    - Implemented Google Cloud Run v2 architecture

[2] Google Cloud Run Microservice Ingestion Pipeline Setup
    Qty: 25 hrs  @ $160.00/hr .................... $4,000.00
    - Multi-stage Docker containerization (Node.js Alpine)
    - Workload Identity Federation CI/CD setup via GitHub Actions

[3] Gemini 3.8 Flash Structured Output Schema Tuning & Eval
    Qty: 15 hrs  @ $190.00/hr .................... $2,850.00
    - JSON Schema enforcement for document parsing
    - Latency optimization and healthz probe validation

-----------------------------------------------------
SUBTOTAL:                                     $13,850.00
STATE & LOCAL TAX (8.50%):                     $1,177.25
SHIPPING / FREIGHT CHARGES:                        $0.00
=====================================================
TOTAL BALANCE DUE:                            $15,027.25
=====================================================

Wire Remittance Instructions:
Bank: Silicon Valley Commercial Bank
Routing ABA: 121000358
Account Number: 984021849102
Please include INV-2024-8849 in the remittance wire memo.
Thank you for your business!`,
  },
  {
    id: 'contractor-invoice-2',
    name: 'DevOps Contractor - Invoice #DEV-2024-042',
    type: 'invoice',
    category: 'Freelance & SRE Billing',
    description: 'Euro-denominated DevOps contract invoice with European VAT ID and hourly milestones.',
    content: `Nordic Cloud Ops ApS
Vestergade 14, 2. sal
1456 Copenhagen, Denmark
VAT/CVR: DK39821044
Email: invoice@nordiccloudops.eu

INVOICE FOR SERVICES RENDERED
Invoice ID: DEV-2024-042
Date of Issue: 2024-10-28
Due Date: 2024-11-11
Terms: 14 Days Net
Currency: EUR

Customer:
FinTech ScaleUp Berlin GmbH
Friedrichstraße 68
10117 Berlin, Germany
VAT ID: DE301928374

Itemized Breakdown:
- Kubernetes to Google Cloud Run Migration Consulting (30 hours x 140.00 EUR) = 4,200.00 EUR
- GitHub Actions Zero-Trust WIF Configuration (12 hours x 140.00 EUR) = 1,680.00 EUR
- Prometheus Monitoring & Cloud Logging Alerting Policies (8 hours x 140.00 EUR) = 1,120.00 EUR

Subtotal: 7,000.00 EUR
EU Reverse Charge Mechanism Applied (VAT 0.00%): 0.00 EUR
Total Payable: 7,000.00 EUR`,
  },
  {
    id: 'messy-resume-1',
    name: 'Candidate CV - Alex Morgan (Cloud Platform)',
    type: 'resume',
    category: 'Cloud / DevOps Resume',
    description: 'Complex multi-column engineering resume with mixed formatting, metrics, and certifications.',
    content: `ALEX MORGAN
Austin, Texas | (555) 234-5678 | alex.morgan.cloud@example.com | github.com/alexmorgan-cloud

SUMMARY
High-impact Cloud Infrastructure & Platform Engineer with 5+ years of experience engineering serverless microservices, Google Cloud Platform architectures, containerization (Docker/Kubernetes), and declarative Infrastructure as Code (Terraform). Passionate about developer tooling, zero-trust CI/CD, and cost optimization.

CORE TECHNICAL SKILLS
- Cloud Platforms: Google Cloud Platform (Cloud Run, Artifact Registry, Secret Manager, Cloud SQL, IAM, Cloud Storage, VPC), AWS
- DevOps & CI/CD: GitHub Actions, Workload Identity Federation, Docker, Multi-Stage Builds, Kubernetes, Helm, ArgoCD
- Infrastructure as Code: Terraform, Terragrunt, OpenTofu
- Languages: TypeScript, Node.js, Go, Python, Bash
- Observability: Google Cloud Logging, Prometheus, Grafana, OpenTelemetry
- AI/ML Ingestion: Gemini API (Structured Outputs), Document Extraction Pipelines

PROFESSIONAL EXPERIENCE

HyperScale Cloud Tech | Austin, TX
Lead Cloud Infrastructure Engineer (March 2022 - Present)
- Designed and maintained a serverless document parsing microservice running on Google Cloud Run v2, serving 2.4M monthly requests with 99.99% uptime.
- Replaced fragile static GCP Service Account JSON keys with GitHub Actions Workload Identity Federation, eliminating secret sprawl across 14 team repositories.
- Reduced container image sizes by 78% (from 480MB to 105MB) using multi-stage Alpine Docker builds, slashing Cloud Run cold-start latency from 4.2s to 680ms.
- Authored reusable Terraform modules for Artifact Registry, Cloud Run, and Secret Manager, saving ~35 engineering hours per new microservice rollout.
- Configured Cloud Monitoring alerting policies and structured JSON logging with custom trace correlation IDs for instant incident root-cause analysis.

Vanguard Systems | Dallas, TX
DevOps / Cloud Engineer (June 2019 - February 2022)
- Automated deployment workflows using GitHub Actions and Docker, reducing release cycle time from 2 days to under 15 minutes.
- Provisioned and managed PostgreSQL Cloud SQL instances with private IP VPC peering and automated point-in-time recovery.
- Led migration of 12 legacy monolith components into containerized microservices.

EDUCATION
University of Texas at Austin
Bachelor of Science in Computer Science (Graduated May 2019)
GPA: 3.8 / 4.0

CERTIFICATIONS
- Google Cloud Certified Professional Cloud Architect (PCA)
- HashiCorp Certified Terraform Associate (003)
- Certified Kubernetes Administrator (CKA)`,
  },
];
