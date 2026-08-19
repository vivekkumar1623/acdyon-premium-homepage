import React from 'react';
import { Shuffle, Network, GitCompare, Cpu, CheckCircle } from 'lucide-react';

export function Architecture() {
  const pillars = [
    {
      icon: <Shuffle className="w-5 h-5 text-cyan-400" />,
      title: "TLS & JA4 ClientHello Shuffling",
      subtitle: "Eliminating Headless Detection Surface",
      description: "Default Python, Go, and cURL network stacks broadcast unmistakable automation signatures (cipher suite orders, missing GREASE extensions, rigid ALPN frames). PulseGuard mimics modern macOS/Windows browser TLS handshakes down to the byte sequence.",
      metrics: ["JA4 match: 100%", "Cipher suites: 18+", "GREASE extension injection: Auto"]
    },
    {
      icon: <Network className="w-5 h-5 text-emerald-400" />,
      title: "Adaptive Residential Circuit Pacing",
      subtitle: "Preventing Subnet Burns & 429 Cascades",
      description: "Aggressive burst scraping burns IPs within hours. PulseGuard employs a distributed token-bucket queue across Tier-1 residential egress nodes. When upstream latency spikes or friction is detected, requests automatically back off and hop circuits.",
      metrics: ["Global exit nodes: 40+ regions", "Automatic circuit failover: < 20ms", "Burst smoothing: Leaky-bucket"]
    },
    {
      icon: <GitCompare className="w-5 h-5 text-amber-400" />,
      title: "Structural DOM Schema Recovery",
      subtitle: "Ending Silent Extraction Failures",
      description: "The most insidious scraping bug is the 200 OK response with NULL fields after an overnight frontend deploy. PulseGuard's AST parser detects selector dropouts, falls back to semantic proximity heuristics, and delivers complete payloads.",
      metrics: ["Silent corruption prevention: 100%", "Proximity heuristics: Enabled", "Hotpatch rule diffs: Real-time"]
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      title: "Sub-4ms Edge Proxy Overhead",
      subtitle: "Zero Headless Browser Memory Bloat",
      description: "Running fleets of headless Chromium instances burns gigabytes of memory and adds seconds of render overhead. PulseGuard operates entirely at the edge transport layer, delivering browser-level evasion at raw HTTP speeds.",
      metrics: ["Median edge latency: < 3.8ms", "Memory overhead: 0MB per tab", "Throughput: 10k+ req/sec"]
    }
  ];

  return (
    <section id="architecture" className="py-20 md-py-28 relative bg-canvas">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 mb-3">
            <Cpu className="w-3-5 h-3-5" />
            <span>Systems Architecture</span>
          </div>
          <h2 className="text-3xl sm-text-4xl font-extrabold text-white tracking-tight">
            How PulseGuard Keeps Ingestion Pipelines Alive
          </h2>
          <p className="text-slate-400 text-sm sm-text-base mt-3">
            Engineered to survive bot-detection algorithms and fragile frontend markup without getting blocked or burning egress infrastructure.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md-grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx} 
              className="p-6 sm-p-7 rounded-2xl bg-slate-950 border border-slate-800 hover-border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2-5 rounded-xl bg-slate-900 border border-slate-800">
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-mono text-slate-500">Pillar 0{idx + 1}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 mb-1">
                  {pillar.title}
                </h3>
                <div className="text-xs font-mono text-cyan-400 mb-3">
                  {pillar.subtitle}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              {/* Spec metric pills */}
              <div className="pt-4 border-t border-slate-900 flex flex-wrap gap-2">
                {pillar.metrics.map((m, mIdx) => (
                  <span key={mIdx} className="inline-flex items-center gap-1-5 px-2-5 py-1 rounded-md bg-slate-900 border border-slate-800 text-2xs font-mono text-slate-300">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>{m}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
