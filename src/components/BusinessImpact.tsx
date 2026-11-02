import React from 'react';

export function BusinessImpact() {
  const comparison = [
    {
      metric: 'Time to Process 1 Document',
      thisService: 'Under 1 second (Instant)',
      manualStaff: '3 – 5 minutes per document',
      legacySoftware: '30 – 60 seconds (Slow scans)',
      impact: 'Frees employees from spending hours typing up receipts and bills.',
    },
    {
      metric: 'Typing & Calculation Errors',
      thisService: '0% (Exact computer matching)',
      manualStaff: '4% – 8% human typos',
      legacySoftware: '12% – 18% layout failures',
      impact: 'Stops accounting mistakes and duplicate vendor payments.',
    },
    {
      metric: 'Cost for 1,000 Documents',
      thisService: 'Less than $1.00 total',
      manualStaff: '~$350.00 (Staff hourly wages)',
      legacySoftware: '$45.00 – $120.00 in licenses',
      impact: 'Cuts document processing costs by more than 95%.',
    },
    {
      metric: 'Handling New Vendor Formats',
      thisService: 'Automatic (No setup needed)',
      manualStaff: 'Staff have to learn each form',
      legacySoftware: 'Breaks; requires redesigning templates',
      impact: 'No need to hire IT consultants every time a vendor changes an invoice.',
    },
    {
      metric: 'Workplace Impact',
      thisService: 'Staff focus on high-value tasks',
      manualStaff: 'Burnout from mind-numbing data entry',
      legacySoftware: 'Frustration from software errors',
      impact: 'Boosts team morale by automating boring repetitive work.',
    },
  ];

  return (
    <div className="border border-neutral-200 bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs text-neutral-500 uppercase tracking-wider block font-semibold">
            Business Results & ROI
          </span>
          <h2 className="text-base font-bold text-neutral-950 tracking-tight mt-0.5">
            How This Saves Time & Cuts Costs
          </h2>
        </div>
        <span className="text-xs text-neutral-500">
          Comparing manual typing with automated processing
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans text-xs">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/80 text-xs font-semibold text-neutral-600">
              <th className="py-3 px-6">Comparison Factor</th>
              <th className="py-3 px-6 text-neutral-950 bg-neutral-100">
                This Automated Service
              </th>
              <th className="py-3 px-6">Manual Human Typing</th>
              <th className="py-3 px-6">Old Scanning Software</th>
              <th className="py-3 px-6 text-neutral-600">Why It Matters to Business</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {comparison.map((row, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/60 transition-colors">
                <td className="py-3.5 px-6 font-semibold text-neutral-900 whitespace-nowrap">
                  {row.metric}
                </td>
                <td className="py-3.5 px-6 font-bold text-neutral-950 bg-neutral-100/40 whitespace-nowrap">
                  {row.thisService}
                </td>
                <td className="py-3.5 px-6 text-neutral-600 whitespace-nowrap">
                  {row.manualStaff}
                </td>
                <td className="py-3.5 px-6 text-neutral-600 whitespace-nowrap">
                  {row.legacySoftware}
                </td>
                <td className="py-3.5 px-6 text-neutral-700 max-w-xs leading-relaxed">
                  {row.impact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 text-xs text-neutral-600 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <span>Typical business outcome: <strong>40+ hours of employee time saved every month</strong></span>
        <span className="font-semibold text-neutral-950">Immediate ROI</span>
      </div>
    </div>
  );
}
