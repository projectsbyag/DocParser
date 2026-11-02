import React from 'react';

export function PipelineFlow() {
  const steps = [
    {
      step: '01',
      title: 'Upload Any Document',
      subtitle: 'PDFs, Mobile Photos, or Email Scans',
      specs: [
        'Works with crooked scans, faded receipts, or multi-page invoices',
        'Staff don’t need to crop, clean, or format the document first',
        'Upload via drag-and-drop or automatic email inbox sync',
      ],
      result: 'Document received in under 0.1 seconds',
    },
    {
      step: '02',
      title: 'Extract Essential Data',
      subtitle: 'Zero Manual Typing or Transcribing',
      specs: [
        'Pulls out vendor names, invoice numbers, tax rates, and line items',
        'Works across completely different layouts without custom templates',
        'Eliminates 100% of human typing and calculation mistakes',
      ],
      result: 'Accuracy checked & formatted in 0.2 seconds',
    },
    {
      step: '03',
      title: 'Filing & Accounting Sync',
      subtitle: 'Direct into QuickBooks, SAP, or HR Systems',
      specs: [
        'Instantly creates the bill or candidate record in your company database',
        'Flags duplicate invoices so companies never pay the same bill twice',
        'Frees your office staff from hours of tedious, repetitive data entry',
      ],
      result: 'Record saved & ready for payment approval',
    },
  ];

  return (
    <div className="border border-neutral-200 bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs text-neutral-500 uppercase tracking-wider block font-semibold">
            How It Works
          </span>
          <h2 className="text-base font-bold text-neutral-950 tracking-tight mt-0.5">
            The Three-Step Automatic Filing Process
          </h2>
        </div>
        <span className="text-xs text-neutral-500">
          Takes less than 1 second from upload to database
        </span>
      </div>

      {/* 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
        {steps.map((s) => (
          <div key={s.step} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-neutral-400">
                  STEP // {s.step}
                </span>
                <span className="text-[10px] text-neutral-700 bg-neutral-100 px-2 py-0.5 font-medium">
                  AUTOMATED
                </span>
              </div>
              <h3 className="text-sm font-bold text-neutral-950 tracking-tight">
                {s.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                {s.subtitle}
              </p>

              <ul className="mt-4 space-y-2.5 text-xs text-neutral-700 leading-relaxed font-sans">
                {s.specs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-400 font-bold">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-100 text-xs text-neutral-600 flex items-center justify-between font-medium">
              <span>{s.result}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
