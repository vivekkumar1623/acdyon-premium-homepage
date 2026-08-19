import React, { useState } from 'react';
import { CODE_SNIPPETS } from '../data/mockScenarios';
import { Copy, Check, Code2, ArrowRight } from 'lucide-react';

export function CodeIntegration() {
  const [selectedLang, setSelectedLang] = useState('curl');
  const [copied, setCopied] = useState(false);

  const snippet = CODE_SNIPPETS[selectedLang] || CODE_SNIPPETS.curl;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { key: 'curl', label: 'cURL' },
    { key: 'python', label: 'Python (httpx / requests)' },
    { key: 'node', label: 'Node.js (Playwright)' },
    { key: 'go', label: 'Go (net/http)' }
  ];

  return (
    <section id="integration" className="py-20 md-py-28 relative bg-surface-panel border-t">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-pill border border-cyan-dim text-xs font-mono text-cyan-300 mb-3">
            <Code2 className="w-3-5 h-3-5" />
            <span>Drop-in Integration</span>
          </div>
          <h2 className="text-3xl sm-text-4xl font-extrabold text-white tracking-tight">
            Drop into Your Existing Codebase in 30 Seconds
          </h2>
          <p className="text-slate-400 text-sm sm-text-base mt-2">
            No proprietary crawler SDKs to learn. Simply configure your standard HTTP proxy client and PulseGuard handles evasion, TLS fingerprints, and schema resilience automatically.
          </p>
        </div>

        {/* Code Block Container */}
        <div className="max-w-4xl mx-auto terminal-window">
          
          {/* Terminal Window Header */}
          <div className="terminal-header flex flex-col sm-flex-row items-stretch sm-items-center justify-between gap-3">
            
            {/* Tabs */}
            <div className="flex items-center gap-1-5 overflow-x-auto">
              <div className="terminal-dots mr-2 hidden sm-flex">
                <span className="terminal-dot dot-red"></span>
                <span className="terminal-dot dot-yellow"></span>
                <span className="terminal-dot dot-green"></span>
              </div>

              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedLang(tab.key)}
                  className={`px-3 py-1-5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                    selectedLang === tab.key
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                      : 'text-slate-400 hover-text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1-5 px-3 py-1-5 rounded-md bg-slate-900 hover-bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover-text-white transition-colors cursor-pointer self-end"
            >
              {copied ? <Check className="w-3-5 h-3-5 text-emerald-400" /> : <Copy className="w-3-5 h-3-5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Snippet'}</span>
            </button>
          </div>

          {/* Code Content Body */}
          <div className="terminal-body bg-surface-dark p-6">
            <div className="flex items-center justify-between text-2xs text-slate-500 font-mono pb-3 mb-3 border-b border-slate-800">
              <span>// {snippet.filename}</span>
              <span className="uppercase">{snippet.language}</span>
            </div>
            <pre className="text-xs sm-text-sm font-mono text-slate-200 leading-relaxed overflow-x-auto">
              {snippet.code}
            </pre>
          </div>

          {/* Quick Explainer Bar */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm-flex-row items-start sm-items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Fully compatible with Scrapy, Puppeteer, Selenium, Beautiful Soup, and Colly.</span>
            </div>
            <a href="#specs" className="text-cyan-400 hover-text-cyan flex items-center gap-1" style={{ textDecoration: 'none' }}>
              <span>View full protocol specs</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
