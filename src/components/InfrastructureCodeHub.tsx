import React, { useState } from 'react';
import { INFRASTRUCTURE_FILES } from '../data/infrastructureCode';
import {
  FileCode,
  Copy,
  Check,
  Terminal,
  FolderGit2
} from 'lucide-react';

export function InfrastructureCodeHub() {
  const [selectedFileId, setSelectedFileId] = useState<string>(INFRASTRUCTURE_FILES[0].id);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const selectedFile = INFRASTRUCTURE_FILES.find((f) => f.id === selectedFileId) || INFRASTRUCTURE_FILES[0];

  const handleCopyCurrent = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAllAsManifest = () => {
    const fullText = INFRASTRUCTURE_FILES.map(
      (f) => `### FILE: ${f.filename}\n\`\`\`${f.language}\n${f.code}\n\`\`\`\n`
    ).join('\n---\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="border border-neutral-200 rounded-xl p-6 bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
              <span>Production Code Repository</span>
              <span aria-hidden="true">·</span>
              <span>Ready for Immediate Deployment</span>
              <span aria-hidden="true">·</span>
              <span>7 Source Files</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-950 tracking-tight">
              Cloud Infrastructure & Automation Hub
            </h1>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Complete configuration files for multi-stage Docker builds, Workload Identity Federation CI/CD, Terraform Cloud Run v2 provisioning, and GitHub Codespaces.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={handleCopyAllAsManifest}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-50 border border-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Manifest Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Complete Repository Manifest</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main File Explorer & Code Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: File Tree */}
        <div className="lg:col-span-4 space-y-4">
          <div className="border border-neutral-200 rounded-xl p-4 bg-white">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4 text-neutral-700" /> Repository Files
              </span>
              <span className="font-mono text-neutral-400">{INFRASTRUCTURE_FILES.length} files</span>
            </div>

            <div className="space-y-1.5">
              {INFRASTRUCTURE_FILES.map((file) => {
                const isSelected = selectedFileId === file.id;
                return (
                  <button
                    key={file.id}
                    onClick={() => setSelectedFileId(file.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors flex items-start justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-neutral-500'}`} />
                        <span className="font-mono text-xs font-semibold">{file.filename}</span>
                      </div>
                      <div className={`text-[11px] line-clamp-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {file.summary}
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                      isSelected
                        ? 'border-neutral-700 bg-neutral-800 text-neutral-300'
                        : 'border-neutral-200 bg-neutral-100 text-neutral-600'
                    }`}>
                      {file.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick CLI Steps */}
          <div className="border border-neutral-200 rounded-xl p-4 bg-white text-xs space-y-2.5">
            <div className="font-bold text-neutral-900 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-neutral-800" />
              Codespaces: Three-Step Deployment
            </div>
            <p className="text-neutral-500 text-[11px]">
              Execute inside your GitHub Codespaces terminal:
            </p>
            <div className="bg-[#0f0f0f] p-3 rounded-lg border border-neutral-800 font-mono text-[11px] text-neutral-200 space-y-1.5 overflow-x-auto">
              <div><span className="text-neutral-500"># 1. Authenticate GCP</span><br />gcloud auth login</div>
              <div><span className="text-neutral-500"># 2. Provision with Terraform</span><br />cd terraform && terraform apply</div>
              <div><span className="text-neutral-500"># 3. Trigger CI/CD Pipeline</span><br />git push origin main</div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Display */}
        <div className="lg:col-span-8 flex flex-col border border-neutral-200 rounded-xl bg-white overflow-hidden h-[700px]">
          {/* Header */}
          <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-neutral-900" />
                <span className="font-mono text-xs font-bold text-neutral-950">{selectedFile.filename}</span>
                <span className="text-[11px] font-mono text-neutral-500">[{selectedFile.language}]</span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">{selectedFile.summary}</p>
            </div>

            <button
              onClick={handleCopyCurrent}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Cloud Concept Callout */}
          <div className="px-4 py-2 border-b border-neutral-200 bg-white text-xs text-neutral-600">
            <span className="font-semibold text-neutral-900">Cloud Concept: </span>
            {selectedFile.cloudConcept}
          </div>

          {/* Code Viewer Body */}
          <div className="flex-1 p-4 overflow-auto bg-[#0d0d0d] font-mono text-xs leading-relaxed text-neutral-200 border-t border-neutral-800">
            <pre className="whitespace-pre">
              {selectedFile.code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
