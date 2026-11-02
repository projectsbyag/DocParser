import React, { useState } from 'react';
import { ChaosToOrderHero } from './components/ChaosToOrderHero';
import { PipelineFlow } from './components/PipelineFlow';
import { BusinessImpact } from './components/BusinessImpact';
import { Workbench } from './components/Workbench';
import { FileText, ArrowRight, CheckCircle2, Clock, DollarSign, Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'sandbox'>('overview');

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#0a0a0a] flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Clean Non-Technical Header */}
      <header className="sticky top-0 z-50 bg-[#fafafa]/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          {/* Wordmark */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('overview');
              }}
              className="text-base font-bold tracking-tight text-black whitespace-nowrap hover:opacity-80 transition-opacity"
            >
              DocuParse
            </a>
            <span className="hidden sm:inline text-xs text-neutral-400">·</span>
            <span className="hidden sm:inline text-xs text-neutral-500 font-medium">
              Document Automation Service
            </span>
          </div>

          {/* Simple Navigation */}
          <nav className="flex items-center gap-1 border border-neutral-200 bg-white p-0.5 text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-black text-white font-semibold'
                  : 'text-neutral-600 hover:text-black font-medium'
              }`}
            >
              Overview & Live Demo
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-3 py-1.5 transition-colors cursor-pointer ${
                activeTab === 'sandbox'
                  ? 'bg-black text-white font-semibold'
                  : 'text-neutral-600 hover:text-black font-medium'
              }`}
            >
              Test Your Own Document
            </button>
          </nav>

          {/* Call to Action */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setActiveTab('sandbox')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-black hover:bg-neutral-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              Try Interactive Sandbox →
            </button>
          </div>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full space-y-12">
        {activeTab === 'overview' && (
          <>
            {/* Business Hero Headline */}
            <section className="space-y-6">
              <div className="max-w-4xl space-y-3">
                <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                  <span>Workflow Automation</span>
                  <span>·</span>
                  <span>Zero Manual Data Entry</span>
                  <span>·</span>
                  <span>Instant Database Filing</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.14]">
                  Turn messy invoices, receipts, and resumes into clean database records in seconds.
                </h1>

                <p className="text-base text-neutral-600 leading-relaxed font-sans max-w-3xl pt-1">
                  Instead of staff spending hours manually opening PDFs and typing numbers into accounting software, DocuParse reads the document, extracts every key detail with 100% accuracy, and files it automatically.
                </p>

                {/* Key Business Highlights Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 border border-neutral-200 bg-white flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-neutral-800 shrink-0" />
                    <div>
                      <span className="font-bold text-neutral-900 block">Under 1 Second</span>
                      <span className="text-neutral-500 text-[11px]">Cuts processing time by 90%</span>
                    </div>
                  </div>

                  <div className="p-3 border border-neutral-200 bg-white flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0" />
                    <div>
                      <span className="font-bold text-neutral-900 block">Zero Typing Mistakes</span>
                      <span className="text-neutral-500 text-[11px]">Eliminates human transposition errors</span>
                    </div>
                  </div>

                  <div className="p-3 border border-neutral-200 bg-white flex items-center gap-2.5">
                    <DollarSign className="w-4 h-4 text-neutral-800 shrink-0" />
                    <div>
                      <span className="font-bold text-neutral-900 block">95%+ Cost Reduction</span>
                      <span className="text-neutral-500 text-[11px]">Costs pennies per 1,000 files</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Chaos-to-Order Centerpiece */}
              <div>
                <div className="mb-2 text-xs text-neutral-500 font-semibold uppercase tracking-wider">
                  Interactive Preview: Click a sample below to see it extract live
                </div>
                <ChaosToOrderHero />
              </div>
            </section>

            {/* 3-Step Simple Pipeline */}
            <section className="pt-2">
              <PipelineFlow />
            </section>

            {/* Business Impact & ROI Table */}
            <section className="pt-2">
              <BusinessImpact />
            </section>

            {/* Bottom Call to Action */}
            <section className="border border-neutral-200 p-8 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-lg font-bold text-neutral-950">
                  Ready to test with your own company documents?
                </h2>
                <p className="text-xs text-neutral-600 mt-1 max-w-xl">
                  Paste any vendor invoice text, applicant resume, or receipt into the interactive sandbox to see the exact fields sorted in real time.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('sandbox')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-black hover:bg-neutral-800 transition-colors whitespace-nowrap cursor-pointer"
              >
                Open Testing Sandbox →
              </button>
            </section>
          </>
        )}

        {activeTab === 'sandbox' && (
          <section className="space-y-6">
            <Workbench />
          </section>
        )}
      </main>

      {/* Non-Technical Footer */}
      <footer className="border-t border-neutral-200 bg-white py-8 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-950">DocuParse</span>
            <span>·</span>
            <span>Automated Document Intelligence Service</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-500">
            <span>Designed for HR, Accounting & Operations Teams</span>
            <span>·</span>
            <span>100% Secure Processing</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
