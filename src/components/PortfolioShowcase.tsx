import React, { useState } from 'react';
import { ARCHITECTURE_NODES, RESUME_BULLETS, INTERVIEW_QUESTIONS } from '../data/portfolioGuide';
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Cpu,
  ShieldCheck,
  FileText,
  HelpCircle,
  Layers
} from 'lucide-react';

export function PortfolioShowcase() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(ARCHITECTURE_NODES[1].id);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openQuestionIdx, setOpenQuestionIdx] = useState<number | null>(0);

  const selectedNode = ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) || ARCHITECTURE_NODES[1];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const mermaidDiagramCode = `graph TD
    Client["Client / ERP Webhook"] -->|HTTPS POST /api/parse-document| CloudRun["Google Cloud Run v2<br/>(Node.js 22 Multi-Stage Alpine)"]
    CloudRun -->|Mount Secret at Boot| SecretManager["GCP Secret Manager<br/>(GEMINI_API_KEY)"]
    CloudRun -->|Extract via responseSchema| Gemini["Gemini 3.8 Flash<br/>(Strict JSON Schema)"]
    CloudRun -->|Emits JSON with Trace ID| CloudLogging["Google Cloud Logging"]
    CloudRun -.->|Validated SQL / Records| Database[("Cloud SQL / PostgreSQL<br/>or Firestore")]

    subgraph CI/CD Zero-Trust Pipeline
      GitCommit["Developer Git Push"] --> GitHubActions["GitHub Actions Runner"]
      GitHubActions -->|OIDC Exchange Token| WIF["Workload Identity Federation<br/>(Zero Long-Lived Keys)"]
      WIF -->|Temporary IAM Auth| ArtifactRegistry["Google Artifact Registry<br/>(Docker OCI Images)"]
      ArtifactRegistry -->|Deploy Revision Tag| CloudRun
    end`;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Portfolio Hook Header */}
      <div className="border border-neutral-200 rounded-xl p-8 bg-white">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <span>Career & Portfolio Guide</span>
              <span aria-hidden="true">·</span>
              <span>Cloud & DevOps Roles</span>
              <span aria-hidden="true">·</span>
              <span>Google XYZ Formula</span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-950 tracking-tight">
              Presenting This Project to Hiring Managers & Recruiters
            </h1>
            <p className="text-sm text-neutral-600 mt-2 max-w-3xl leading-relaxed">
              Recruiters evaluate technical depth based on how candidates describe trade-offs, security boundaries, and infrastructure repeatability. Use the architecture diagram, resume bullets, and interview defense scripts below to articulate this project with confidence.
            </p>
          </div>

          <div className="border border-neutral-200 p-4 rounded-lg bg-neutral-50 shrink-0 lg:w-72">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Recommended Project Title
            </div>
            <div className="text-sm font-bold text-neutral-950 mt-1">
              DocuParse Microservice
            </div>
            <div className="text-xs text-neutral-600 mt-1">
              "GCP Cloud Run · Terraform · Zero-Trust WIF · Gemini Structured Outputs"
            </div>
          </div>
        </div>

        {/* 1. Architecture Visualizer */}
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-neutral-950 flex items-center gap-2">
                <Layers className="w-4 h-4 text-neutral-800" />
                Cloud Architecture Diagram & Component Defense
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Select an infrastructure component to inspect its role, security boundary, and interview justification.
              </p>
            </div>
            <button
              onClick={() => handleCopy(mermaidDiagramCode, 'mermaid')}
              className="px-3 py-1.5 text-xs text-neutral-800 bg-white hover:bg-neutral-50 rounded-md border border-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
            >
              {copiedKey === 'mermaid' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Mermaid Code Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Mermaid Code for README</span>
                </>
              )}
            </button>
          </div>

          {/* Nodes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
            {ARCHITECTURE_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer flex flex-col justify-between h-28 ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <div>
                    <span className={`text-[10px] font-mono uppercase tracking-wider block mb-1 ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {node.badge}
                    </span>
                    <div className="font-semibold text-xs leading-snug">
                      {node.label}
                    </div>
                  </div>
                  <span className={`text-[10px] ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    View defense →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Node Details Box */}
          <div className="border border-neutral-200 rounded-lg p-5 bg-neutral-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200">
              <div>
                <div className="text-xs font-mono text-neutral-500 uppercase">{selectedNode.badge}</div>
                <h3 className="text-base font-bold text-neutral-950 mt-0.5">{selectedNode.label}</h3>
                <p className="text-xs text-neutral-600 mt-0.5">{selectedNode.description}</p>
              </div>
              <span className="text-xs font-mono text-neutral-400">ID: {selectedNode.id}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-md border border-neutral-200 bg-white">
                <div className="text-xs font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-neutral-700" /> System Responsibilities
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">{selectedNode.role}</p>
              </div>

              <div className="p-4 rounded-md border border-neutral-200 bg-white">
                <div className="text-xs font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" /> Architectural Defense
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">{selectedNode.interviewDefense}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Resume Bullets (Google XYZ Format) */}
      <div className="border border-neutral-200 rounded-xl p-8 bg-white">
        <div className="mb-6 pb-3 border-b border-neutral-200">
          <h2 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
            <FileText className="w-4 h-4 text-neutral-800" />
            Resume Bullet Points (Google XYZ / Action-Metric Format)
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Formatted for inclusion under your Technical Experience or Cloud Projects sections.
          </p>
        </div>

        <div className="space-y-6">
          {RESUME_BULLETS.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
                <span className="font-mono text-neutral-400">0{idx + 1}.</span>
                <span>Target Role: {group.role}</span>
              </div>
              <div className="space-y-2">
                {group.bullets.map((bullet, bIdx) => {
                  const key = `bullet-${idx}-${bIdx}`;
                  return (
                    <div
                      key={bIdx}
                      className="group p-3.5 rounded-lg border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 flex items-start justify-between gap-3 transition-colors"
                    >
                      <div className="text-xs text-neutral-800 leading-relaxed">
                        • {bullet}
                      </div>
                      <button
                        onClick={() => handleCopy(bullet, key)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded bg-white border border-neutral-300 text-neutral-700 hover:text-black transition-opacity shrink-0 cursor-pointer"
                        title="Copy bullet"
                      >
                        {copiedKey === key ? (
                          <Check className="w-3 h-3 text-black" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interview Defense & Technical FAQ */}
      <div className="border border-neutral-200 rounded-xl p-8 bg-white">
        <div className="mb-6 pb-3 border-b border-neutral-200">
          <h2 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-neutral-800" />
            Interview Defense: Six Technical Questions Asked by Cloud Architects
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Model responses covering cold starts, zero-trust security, cost modeling, and failure domains.
          </p>
        </div>

        <div className="space-y-3">
          {INTERVIEW_QUESTIONS.map((qa, idx) => {
            const isOpen = openQuestionIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-neutral-200 bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpenQuestionIdx(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-neutral-400 shrink-0">
                      Q{idx + 1}.
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-950">
                      {qa.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-2 text-xs text-neutral-700 border-t border-neutral-100 bg-neutral-50 leading-relaxed">
                    <div className="font-semibold text-neutral-950 mb-1">Architectural Response:</div>
                    {qa.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
