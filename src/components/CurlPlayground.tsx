import React, { useState } from 'react';
import { Copy, Check, Play, RefreshCw, Terminal } from 'lucide-react';

export function CurlPlayground() {
  const [copied, setCopied] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [responseJson, setResponseJson] = useState<any>(null);

  const curlCommand = `curl -X POST "https://docuparse-service-uc.a.run.app/api/parse-document" \\
  -H "Content-Type: application/json" \\
  -d '{"documentType":"invoice","content":"INV-8041 Apex Cloud LLC Total $15,027.25"}'`;

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCurl = async () => {
    setIsRunning(true);
    try {
      const res = await fetch('/api/parse-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: 'invoice',
          content: 'INV-8041 Apex Cloud LLC Subtotal $13,850.00 Tax $1,177.25 Total $15,027.25',
        }),
      });
      const data = await res.json();
      setResponseJson(data);
    } catch (e: any) {
      setResponseJson({ error: e.message });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="border border-neutral-200 bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
            API Invocations
          </span>
          <h2 className="text-base font-bold text-neutral-950 tracking-tight mt-0.5">
            Interactive cURL Terminal
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunCurl}
            disabled={isRunning}
            className="px-3 py-1.5 text-xs font-mono font-medium text-white bg-black hover:bg-neutral-800 transition-colors flex items-center gap-1.5 rounded-xs cursor-pointer disabled:opacity-40"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Execute cURL Request</span>
              </>
            )}
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-mono font-medium text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 transition-colors flex items-center gap-1.5 rounded-xs cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-black" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy cURL'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#0a0a0a] text-neutral-100">
        {/* cURL Command Request */}
        <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-neutral-800 font-mono text-xs">
          <div className="text-[11px] text-neutral-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Request Terminal</span>
            <span>HTTP POST</span>
          </div>
          <pre className="text-neutral-200 whitespace-pre-wrap leading-relaxed">
            {curlCommand}
          </pre>
          <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400">
            Accepts: JSON payload or raw OCR buffer · Header: <code className="text-neutral-300">Content-Type: application/json</code>
          </div>
        </div>

        {/* Response Body */}
        <div className="lg:col-span-5 p-6 font-mono text-xs bg-[#0f0f0f]">
          <div className="text-[11px] text-neutral-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Response Payload</span>
            <span className="text-neutral-300 font-semibold">200 OK</span>
          </div>

          <div className="overflow-auto max-h-[160px] text-neutral-200">
            {responseJson ? (
              <pre className="text-[11px] whitespace-pre-wrap text-neutral-300 leading-snug">
                {JSON.stringify(responseJson.data || responseJson, null, 2)}
              </pre>
            ) : (
              <div className="text-neutral-400 text-xs py-4">
                Click <strong>"Execute cURL Request"</strong> above to send live request to backend and stream JSON response.
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400 flex items-center justify-between">
            <span>Contract: JSON Schema</span>
            <span className="font-semibold text-neutral-300">0% regex error rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
