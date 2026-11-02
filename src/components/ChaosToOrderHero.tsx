import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface DataField {
  key: string;
  value: string | number;
  type: string;
  bbox: { top: string; left: string; width: string; height: string };
  plainLabel: string;
}

interface DemoPreset {
  id: string;
  name: string;
  docTitle: string;
  docType: string;
  skewDeg: number;
  rawTextLines: string[];
  fields: DataField[];
  formattedJson: Record<string, unknown>;
  dbPreview: string;
}

const PRESETS: DemoPreset[] = [
  {
    id: 'invoice-8041',
    name: 'Vendor Invoice',
    docTitle: 'Apex Cloud Systems · Invoice #8041',
    docType: 'Messy Vendor Invoice PDF',
    skewDeg: -0.5,
    rawTextLines: [
      'APEX CLOUD SYSTEMS LLC',
      '100 Silicon Way, Suite 400 - San Francisco CA',
      'Tax Registration ID: US-EIN-84-2910394',
      'Bill To: Meridian Global Enterprises',
      'Purchase Order: PO-CLOUD-2024-771',
      'Invoice Number: INV-8041        Date: Oct 14, 2024',
      'Payment Due: Nov 13, 2024       Terms: Net 30 Days',
      '-------------------------------------------------------',
      'Infrastructure Architecture Review    40 hrs  @ $175.00  $7,000.00',
      'Cloud Document Ingestion Pipeline     25 hrs  @ $160.00  $4,000.00',
      'Security & Workflow Automation        15 hrs  @ $190.00  $2,850.00',
      '-------------------------------------------------------',
      'Subtotal Amount:                                         $13,850.00',
      'Sales Tax (8.50%):                                        $1,177.25',
      'TOTAL BALANCE DUE:                                       $15,027.25',
    ],
    fields: [
      {
        key: 'invoice_number',
        value: 'INV-8041',
        type: 'string',
        bbox: { top: '33%', left: '26%', width: '18%', height: '5.5%' },
        plainLabel: 'Invoice Number',
      },
      {
        key: 'vendor_name',
        value: 'Apex Cloud Systems LLC',
        type: 'string',
        bbox: { top: '6%', left: '4%', width: '48%', height: '5.5%' },
        plainLabel: 'Vendor Name',
      },
      {
        key: 'vendor_tax_id',
        value: 'US-EIN-84-2910394',
        type: 'string',
        bbox: { top: '16%', left: '4%', width: '45%', height: '5.5%' },
        plainLabel: 'Tax ID',
      },
      {
        key: 'invoice_date',
        value: '2024-10-14',
        type: 'string',
        bbox: { top: '33%', left: '62%', width: '26%', height: '5.5%' },
        plainLabel: 'Issue Date',
      },
      {
        key: 'subtotal_amount',
        value: 13850.0,
        type: 'number',
        bbox: { top: '78%', left: '72%', width: '24%', height: '5.5%' },
        plainLabel: 'Subtotal',
      },
      {
        key: 'tax_amount',
        value: 1177.25,
        type: 'number',
        bbox: { top: '84%', left: '72%', width: '24%', height: '5.5%' },
        plainLabel: 'Tax Amount',
      },
      {
        key: 'total_amount_due',
        value: 15027.25,
        type: 'number',
        bbox: { top: '90%', left: '70%', width: '26%', height: '6%' },
        plainLabel: 'Total Due',
      },
    ],
    formattedJson: {
      invoice_number: 'INV-8041',
      vendor_name: 'Apex Cloud Systems LLC',
      tax_id: 'US-EIN-84-2910394',
      invoice_date: '2024-10-14',
      payment_due_date: '2024-11-13',
      payment_terms: 'Net 30 Days',
      currency: 'USD',
      number_of_items: 3,
      subtotal_amount: 13850.0,
      tax_amount: 1177.25,
      total_amount_due: 15027.25,
      verification_status: 'CONFIRMED',
    },
    dbPreview: `Customer: Meridian Global Enterprises
Vendor: Apex Cloud Systems LLC
Invoice #: INV-8041
Date Issued: October 14, 2024
Due Date: November 13, 2024
Status: Approved for Payment
Total Payable: $15,027.25 USD
Accounting Tag: General IT Consulting`,
  },
  {
    id: 'resume-sre',
    name: 'Candidate Resume',
    docTitle: 'Applicant CV · Alex Morgan',
    docType: 'Job Candidate Resume',
    skewDeg: 0.3,
    rawTextLines: [
      'ALEX MORGAN · Senior Cloud & Systems Engineer',
      'Email: alex.morgan.cloud@example.com | Location: Austin, TX',
      'Professional Summary:',
      'Experienced systems engineer with 5+ years building automated cloud',
      'data pipelines, reducing operational costs, and securing company data.',
      'Work Experience:',
      'HyperScale Tech - Lead Systems Engineer (2022 - Present)',
      '- Built automated document pipeline processing 2M+ files per month',
      '- Automated deployments, saving team 35+ hours of manual work weekly',
      'Vanguard Networks - Cloud Engineer (2019 - 2022)',
      '- Managed company customer databases with 99.99% uptime',
      'Education: B.S. in Computer Science, UT Austin (2019)',
      'Certifications: Google Cloud Professional Architect',
    ],
    fields: [
      {
        key: 'candidate_name',
        value: 'Alex Morgan',
        type: 'string',
        bbox: { top: '5%', left: '4%', width: '32%', height: '6%' },
        plainLabel: 'Full Name',
      },
      {
        key: 'email_address',
        value: 'alex.morgan.cloud@example.com',
        type: 'string',
        bbox: { top: '12%', left: '12%', width: '48%', height: '6%' },
        plainLabel: 'Email',
      },
      {
        key: 'current_job_title',
        value: 'Lead Systems Engineer',
        type: 'string',
        bbox: { top: '44%', left: '34%', width: '42%', height: '6%' },
        plainLabel: 'Job Title',
      },
      {
        key: 'current_employer',
        value: 'HyperScale Tech',
        type: 'string',
        bbox: { top: '44%', left: '4%', width: '28%', height: '6%' },
        plainLabel: 'Employer',
      },
      {
        key: 'certification',
        value: 'Google Cloud Professional Architect',
        type: 'string',
        bbox: { top: '88%', left: '24%', width: '58%', height: '6%' },
        plainLabel: 'Certification',
      },
    ],
    formattedJson: {
      candidate_name: 'Alex Morgan',
      email_address: 'alex.morgan.cloud@example.com',
      location: 'Austin, TX',
      current_job_title: 'Lead Systems Engineer',
      current_employer: 'HyperScale Tech',
      years_of_experience: '5+ Years',
      education: 'B.S. in Computer Science',
      certifications: ['Google Cloud Professional Architect'],
      hr_status: 'AUTOMATICALLY_INDEXED_FOR_RECRUITERS',
    },
    dbPreview: `Applicant Profile: Alex Morgan
Contact: alex.morgan.cloud@example.com
Location: Austin, TX
Experience: 5+ Years
Current Role: Lead Systems Engineer at HyperScale Tech
Key Qualifications: Cloud Architecture, Automation, Database Management
Profile Status: Ready for Recruiter Review`,
  },
  {
    id: 'receipt-cloud',
    name: 'Expense Receipt',
    docTitle: 'Store Receipt · Nordic Tech Ops',
    docType: 'Scanned Expense Receipt',
    skewDeg: -0.6,
    rawTextLines: [
      'NORDIC TECH OPS APS',
      'Vestergade 14, Copenhagen, Denmark',
      'Business Registration: DK-39821044',
      'Receipt Number: REC-99214',
      'Date & Time: Oct 28, 2024 · 2:32 PM',
      'Payment Terminal: POS Station #04',
      '-------------------------------------------------------',
      '1x Cloud Software Subscription              140.00 EUR',
      '1x Digital Storage Package                   24.50 EUR',
      '1x Support & Maintenance                     12.20 EUR',
      '-------------------------------------------------------',
      'Subtotal:                                   176.70 EUR',
      'VAT / Tax (25.0%):                           44.18 EUR',
      'TOTAL PAID:                                 220.88 EUR',
      'Payment Status: APPROVED · Card ending in 4012',
    ],
    fields: [
      {
        key: 'receipt_number',
        value: 'REC-99214',
        type: 'string',
        bbox: { top: '23%', left: '26%', width: '26%', height: '6%' },
        plainLabel: 'Receipt Number',
      },
      {
        key: 'merchant_name',
        value: 'Nordic Tech Ops ApS',
        type: 'string',
        bbox: { top: '5%', left: '4%', width: '42%', height: '6%' },
        plainLabel: 'Merchant',
      },
      {
        key: 'vat_registration',
        value: 'DK-39821044',
        type: 'string',
        bbox: { top: '14%', left: '32%', width: '28%', height: '6%' },
        plainLabel: 'Tax ID',
      },
      {
        key: 'total_paid',
        value: 220.88,
        type: 'number',
        bbox: { top: '82%', left: '64%', width: '32%', height: '7%' },
        plainLabel: 'Total Paid',
      },
    ],
    formattedJson: {
      receipt_number: 'REC-99214',
      merchant_name: 'Nordic Tech Ops ApS',
      tax_id: 'DK-39821044',
      date: '2024-10-28',
      currency: 'EUR',
      subtotal_amount: 176.7,
      vat_amount: 44.18,
      total_amount_paid: 220.88,
      reimbursement_status: 'READY_FOR_PAYROLL',
    },
    dbPreview: `Expense Report: REC-99214
Merchant: Nordic Tech Ops ApS
Date: October 28, 2024
Category: Software & Office Subscriptions
Currency: EUR (€)
Amount: €220.88 (VAT: €44.18)
Payment Method: Company Card (Approved)
Action: Auto-filed for Employee Expense Reimbursement`,
  },
];

export function ChaosToOrderHero() {
  const [selectedId, setSelectedId] = useState<string>(PRESETS[0].id);
  const [activeHoverKey, setActiveHoverKey] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [machineStatus, setMachineStatus] = useState<string>('COMPLETED');
  const [viewMode, setViewMode] = useState<'clean' | 'raw'>('clean');
  const [copied, setCopied] = useState<boolean>(false);

  const preset = PRESETS.find((p) => p.id === selectedId) || PRESETS[0];

  const handleSelectPreset = (id: string) => {
    setSelectedId(id);
    setIsScanning(true);
    setMachineStatus('READING DOCUMENT');

    setTimeout(() => {
      setMachineStatus('SORTING DATA');
    }, 200);

    setTimeout(() => {
      setMachineStatus('SAVED TO DATABASE');
      setIsScanning(false);
    }, 500);
  };

  const handleCopy = () => {
    const text = viewMode === 'clean' ? preset.dbPreview : JSON.stringify(preset.formattedJson, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="border border-neutral-200 bg-white">
      {/* Top Controller Bar */}
      <div className="px-5 py-3 border-b border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Document Selector Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-neutral-500 font-medium mr-1">
            Choose a sample document to test:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p.id)}
              className={`px-3 py-1.5 text-xs border transition-colors cursor-pointer ${
                selectedId === p.id
                  ? 'bg-black text-white border-black font-semibold'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Live Business Metrics */}
        <div className="flex items-center gap-3 text-xs text-neutral-600">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-black animate-ping" />
            <span className="font-semibold text-neutral-900">Processing Time: 0.14 seconds</span>
          </span>
          <span className="hidden sm:inline text-neutral-300">·</span>
          <span className="hidden sm:inline text-neutral-600">
            Typing Errors: <strong className="text-neutral-900">0%</strong>
          </span>
        </div>
      </div>

      {/* The Split-Pane (Chaos Left vs Order Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Pane: What the Human Sees (Messy Document) */}
        <div className="lg:col-span-6 p-6 bg-[#f7f7f7] border-b lg:border-b-0 lg:border-r border-neutral-200 relative overflow-hidden flex flex-col justify-between select-none">
          {/* Subtle Scanline Laser */}
          {isScanning && (
            <div className="absolute left-0 right-0 h-[2px] bg-neutral-900 shadow-[0_0_8px_rgba(0,0,0,0.8)] z-30 scanline-laser pointer-events-none" />
          )}

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-xs text-neutral-500">
            <span className="font-semibold text-neutral-900">1. Original Messy Document (What comes in)</span>
            <span>{preset.docType}</span>
          </div>

          {/* Paper Viewport */}
          <div
            className="my-4 p-5 bg-white border border-neutral-300 shadow-xs relative text-xs text-neutral-800 leading-relaxed overflow-hidden transition-transform duration-300 font-mono"
            style={{ transform: `rotate(${preset.skewDeg}deg)` }}
          >
            <div className="relative z-10 space-y-1">
              {preset.rawTextLines.map((line, idx) => (
                <div key={idx} className="tracking-tight text-neutral-800">
                  {line}
                </div>
              ))}
            </div>

            {/* Visual Bounding Boxes when hovering */}
            {preset.fields.map((f) => {
              const isTargeted = activeHoverKey === f.key;
              return (
                <div
                  key={f.key}
                  className={`absolute border transition-all duration-150 pointer-events-none z-20 ${
                    isTargeted
                      ? 'border-black bg-black/10 ring-1 ring-black'
                      : 'border-transparent'
                  }`}
                  style={{
                    top: f.bbox.top,
                    left: f.bbox.left,
                    width: f.bbox.width,
                    height: f.bbox.height,
                  }}
                >
                  {isTargeted && (
                    <span className="absolute -top-4 right-0 px-1 py-0.2 bg-black text-white text-[10px] font-sans font-medium">
                      Found: {f.plainLabel}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Guide note */}
          <div className="text-xs text-neutral-500 flex items-center justify-between pt-2 border-t border-neutral-200">
            <span>Normally takes a human ~3 minutes to type</span>
            <span className="text-neutral-400">Hover fields on the right to see where they came from</span>
          </div>
        </div>

        {/* Center Machine Status */}
        <div className="hidden lg:flex w-0 relative items-center justify-center">
          <div className="absolute z-20 -left-14 px-3 py-1 bg-black text-white border border-neutral-800 text-[10px] font-bold tracking-wider uppercase whitespace-nowrap shadow-sm">
            {machineStatus}
          </div>
        </div>

        {/* Right Pane: What the Company Database Receives (Clean & Organized) */}
        <div className="lg:col-span-6 bg-[#0a0a0a] text-neutral-100 p-6 flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs text-neutral-400">
            <div>
              <span className="text-white font-semibold">2. Clean Database Record (What gets saved)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('clean')}
                className={`px-2 py-0.5 text-xs transition-colors cursor-pointer ${
                  viewMode === 'clean' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Human View
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`px-2 py-0.5 text-xs transition-colors cursor-pointer ${
                  viewMode === 'raw' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Data View
              </button>
              <button
                onClick={handleCopy}
                className="px-2 py-0.5 text-xs text-neutral-300 hover:text-white border border-neutral-800 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Clean Record Display with Hover Highlighting */}
          <div className="my-3 text-xs leading-relaxed overflow-x-auto text-neutral-200 font-sans">
            {viewMode === 'clean' ? (
              <div className="space-y-1.5 py-1">
                {Object.entries(preset.formattedJson).map(([k, v]) => {
                  const isHovered = activeHoverKey === k;
                  const label = k.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
                  return (
                    <div
                      key={k}
                      onMouseEnter={() => setActiveHoverKey(k)}
                      onMouseLeave={() => setActiveHoverKey(null)}
                      className={`p-1.5 transition-colors flex items-center justify-between group cursor-pointer ${
                        isHovered ? 'bg-neutral-800 text-white ring-1 ring-neutral-600' : 'hover:bg-neutral-900/80'
                      }`}
                    >
                      <span className="text-neutral-400 font-medium">{label}:</span>
                      <span className="text-white font-semibold">{String(v)}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <pre className="font-mono text-xs text-neutral-300 leading-relaxed whitespace-pre">
                {JSON.stringify(preset.formattedJson, null, 2)}
              </pre>
            )}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>Ready for QuickBooks / SAP / HR Systems</span>
            </span>
            <span className="text-neutral-300 font-medium">Automatic Filing Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
}
