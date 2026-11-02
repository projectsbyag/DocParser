import React, { useState } from 'react';
import {
  Coins,
  Cpu
} from 'lucide-react';

export function StackDeepDive() {
  const [docVolume, setDocVolume] = useState<number>(5000);

  // Cost calculation
  const geminiCost = Number(((docVolume * 1200 * 0.075) / 1000000 + (docVolume * 350 * 0.30) / 1000000).toFixed(2));
  const cloudRunCost = docVolume <= 2000000 ? 0 : Number(((docVolume - 2000000) * 0.0000004).toFixed(2));
  const secretManagerCost = 0.00;
  const garCost = 0.05;

  const totalModernStackCost = Number((geminiCost + cloudRunCost + secretManagerCost + garCost).toFixed(2));
  const legacyOcrCost = Number((docVolume * 0.025).toFixed(2));
  const savings = Math.max(0, legacyOcrCost - totalModernStackCost);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border border-neutral-200 rounded-xl p-8 bg-white">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
          <span>Cloud FinOps & Infrastructure Economics</span>
          <span aria-hidden="true">·</span>
          <span>Google Cloud Platform</span>
          <span aria-hidden="true">·</span>
          <span>Comparative Cost Analysis</span>
        </div>
        <h1 className="text-2xl font-bold text-neutral-950 tracking-tight">
          Cloud Economics & Hardware Optimization
        </h1>
        <p className="text-sm text-neutral-600 mt-2 max-w-3xl leading-relaxed">
          Understanding unit economics and infrastructure costs is an essential capability for senior cloud and platform engineers. This model compares the operating expenditure of serverless containers with traditional OCR virtual machines.
        </p>
      </div>

      {/* Interactive FinOps Simulator */}
      <div className="border border-neutral-200 rounded-xl p-8 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200">
          <div>
            <h2 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
              <Coins className="w-4 h-4 text-neutral-800" />
              Monthly Cloud Cost Simulator
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Simulate monthly infrastructure bills based on document ingestion volume.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-neutral-500">Selected Ingestion Volume:</span>
            <div className="text-xl font-bold font-mono tabular-nums text-neutral-950">
              {docVolume.toLocaleString()} docs / month
            </div>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-3 mb-8">
          <input
            type="range"
            min="500"
            max="100000"
            step="500"
            value={docVolume}
            onChange={(e) => setDocVolume(Number(e.target.value))}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
          <div className="flex justify-between text-[11px] text-neutral-500 font-mono tabular-nums">
            <span>500 docs/mo (Side project)</span>
            <span>25,000 docs/mo (Mid-market app)</span>
            <span>100,000 docs/mo (Enterprise pipeline)</span>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Serverless Microservice */}
          <div className="border-2 border-neutral-900 rounded-lg p-6 bg-white">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1">
              Modern Serverless Microservice
            </div>
            <div className="text-xs text-neutral-500 mb-4">
              Google Cloud Run v2 + Gemini 3.8 Flash (responseSchema)
            </div>

            <div className="text-3xl font-extrabold font-mono tabular-nums text-neutral-950 mb-4">
              ${totalModernStackCost.toFixed(2)}{' '}
              <span className="text-xs text-neutral-500 font-normal">/ month</span>
            </div>

            <div className="space-y-2 text-xs border-t border-neutral-200 pt-4 text-neutral-700 font-mono tabular-nums">
              <div className="flex justify-between">
                <span>Cloud Run (Compute):</span>
                <span className="font-semibold text-neutral-950">${cloudRunCost.toFixed(2)} (Within free tier)</span>
              </div>
              <div className="flex justify-between">
                <span>Gemini 3.8 Flash (Structured Output):</span>
                <span className="font-semibold text-neutral-950">${geminiCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Secret Manager & Artifact Registry:</span>
                <span className="font-semibold text-neutral-950">${garCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Legacy OCR / VMs */}
          <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
              Legacy OCR Pipeline
            </div>
            <div className="text-xs text-neutral-500 mb-4">
              Managed OCR API + Virtual Machine Cluster (EC2 / Compute Engine)
            </div>

            <div className="text-3xl font-extrabold font-mono tabular-nums text-neutral-950 mb-4">
              ${legacyOcrCost.toFixed(2)}{' '}
              <span className="text-xs text-neutral-500 font-normal">/ month</span>
            </div>

            <div className="space-y-2 text-xs border-t border-neutral-200 pt-4 text-neutral-600 font-mono tabular-nums">
              <div className="flex justify-between">
                <span>Managed OCR Extraction ($0.025/page):</span>
                <span className="font-semibold text-neutral-900">${(docVolume * 0.025).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VM Compute Base (Idle 24/7):</span>
                <span>+$35.00/mo min</span>
              </div>
              <div className="flex justify-between">
                <span>Maintenance & Regex Breakage:</span>
                <span>High manual cost</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-neutral-100 border border-neutral-200 text-xs text-neutral-800">
          <strong>FinOps Summary:</strong> Implementing Cloud Run with Gemini Structured Outputs reduces operating costs by approximately{' '}
          <strong className="font-mono tabular-nums text-neutral-950">${savings.toFixed(2)}/month</strong> at this tier while guaranteeing 0% regex parser breakage.
        </div>
      </div>

      {/* Codespaces vs Laptop RAM Guide */}
      <div className="border border-neutral-200 rounded-xl p-8 bg-white">
        <div className="flex items-center gap-2 text-neutral-900 mb-1">
          <Cpu className="w-4 h-4 text-neutral-800" />
          <h2 className="text-lg font-bold text-neutral-950">
            Hardware Optimization: Why GitHub Codespaces Bypasses Local RAM Limits
          </h2>
        </div>
        <p className="text-xs text-neutral-500 mb-6">
          The Gemini suggestion explicitly recommended: <em>"Run your IDE entirely in GitHub Codespaces to bypass your RAM limit."</em> Here is the exact technical explanation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-neutral-200 bg-neutral-50 space-y-3">
            <div className="text-xs font-bold text-neutral-950 uppercase tracking-wider">
              Local Laptop Development (8GB - 16GB RAM)
            </div>
            <ul className="text-xs text-neutral-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="font-mono text-neutral-900 font-bold">—</span>
                <span><strong>Docker Desktop:</strong> Consumes 4GB–8GB RAM just running the Linux VM hypervisor in the background.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-neutral-900 font-bold">—</span>
                <span><strong>VS Code + Browser + Node:</strong> Consumes an additional 3GB–5GB RAM, leading to disk swap thrashing and frozen systems.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-neutral-900 font-bold">—</span>
                <span><strong>Toolchain Clutter:</strong> Requires manually installing <code>gcloud</code>, <code>terraform</code>, and Docker on your host OS.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-lg border-2 border-neutral-900 bg-white space-y-3">
            <div className="text-xs font-bold text-neutral-950 uppercase tracking-wider">
              GitHub Codespaces (.devcontainer)
            </div>
            <ul className="text-xs text-neutral-700 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="font-mono text-neutral-900 font-bold">✓</span>
                <span><strong>Zero Local RAM Consumed:</strong> The editor, Docker-in-Docker daemon, and Node.js runtime run on a dedicated Microsoft Azure cloud VM.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-neutral-900 font-bold">✓</span>
                <span><strong>Pre-Configured Toolchain:</strong> Starts in seconds with <code>gcloud</code>, <code>terraform</code>, and Docker pre-authenticated.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-neutral-900 font-bold">✓</span>
                <span><strong>Generous Free Quota:</strong> Every free GitHub account receives <strong>60 hours per month</strong> of cloud machine time.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
