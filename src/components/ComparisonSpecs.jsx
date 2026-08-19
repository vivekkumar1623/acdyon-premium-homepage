import React from 'react';
import { SPECS_DATA } from '../data/mockScenarios';
import { Check, X, Shield, Activity, Server } from 'lucide-react';

export function ComparisonSpecs() {
  return (
    <section id="specs" className="py-20 md-py-28 relative bg-canvas">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 mb-3">
            <Activity className="w-3-5 h-3-5" />
            <span>Technical Comparison</span>
          </div>
          <h2 className="text-3xl sm-text-4xl font-extrabold text-white tracking-tight">
            How PulseGuard Compares to Raw Scraper Clients
          </h2>
          <p className="text-slate-400 text-sm sm-text-base mt-2">
            A direct architectural comparison between default HTTP scraping stacks and the PulseGuard resilience proxy.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-surface-card shadow-2xl">
          <table className="w-full text-left text-xs sm-text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900 font-mono">
                <th className="p-4 sm-p-5 text-slate-300 font-semibold" style={{ width: '25%' }}>Architecture Axis</th>
                <th className="p-4 sm-p-5 text-cyan-300 font-semibold bg-cyan-subtle border-x border-slate-800" style={{ width: '37.5%' }}>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span>PulseGuard Gateway</span>
                  </div>
                </th>
                <th className="p-4 sm-p-5 text-slate-400 font-semibold" style={{ width: '37.5%' }}>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-slate-500" />
                    <span>Raw Headless / Python / Go Scrapers</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="font-sans">
              {SPECS_DATA.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-800 hover-bg-slate-900 transition-colors">
                  <td className="p-4 sm-p-5 font-mono text-slate-200">
                    <div className="font-semibold text-white">{row.feature}</div>
                    <div className="text-2xs text-slate-500 mt-0-5">{row.category}</div>
                  </td>
                  
                  {/* PulseGuard Column */}
                  <td className="p-4 sm-p-5 bg-cyan-subtle border-x border-slate-800 text-slate-200">
                    <div className="flex items-start gap-2-5">
                      <div className="p-1 rounded bg-slate-900 border border-cyan-dim text-cyan-400 flex-shrink-0 mt-0-5">
                        <Check className="w-3-5 h-3-5" />
                      </div>
                      <span className="leading-relaxed">{row.pulseGuard}</span>
                    </div>
                  </td>

                  {/* Raw Scrapers Column */}
                  <td className="p-4 sm-p-5 text-slate-400">
                    <div className="flex items-start gap-2-5">
                      <div className="p-1 rounded bg-rose-subtle border border-rose-dim text-rose-400 flex-shrink-0 mt-0-5">
                        <X className="w-3-5 h-3-5" />
                      </div>
                      <span className="leading-relaxed text-slate-400">{row.rawScrapers}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live Protocol Benchmark Numbers */}
        <div className="grid grid-cols-2 sm-grid-cols-4 gap-4 mt-10">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-2xl sm-text-3xl font-extrabold text-cyan-400 font-mono">&lt; 3.8ms</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Median Edge Overhead</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-2xl sm-text-3xl font-extrabold text-emerald-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">JA4 Profile Parity</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-2xl sm-text-3xl font-extrabold text-indigo-400 font-mono">0 MB</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Browser RAM Allocation</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-2xl sm-text-3xl font-extrabold text-amber-400 font-mono">99.98%</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">Pipeline Ingestion Uptime</div>
          </div>
        </div>

      </div>
    </section>
  );
}
