import React from 'react';
import { Shuffle, Network, GitCompare, Cpu, CheckCircle } from 'lucide-react';

export function Architecture() {
  const pillars = [
    {
      icon: <Shuffle className="w-5 h-5 text-cyan-400" />,
      title: "TLS & JA4 ClientHello Randomization",
      subtitle: "Bypassing WAF Fingerprinting",
      description: "Default Python (requests/httpx), Go (net/http), and cURL stacks broadcast unmistakable static signatures like rigid cipher orders, missing GREASE extensions, and fixed ALPN tokens. PulseGuard intercepts outbound handshakes and synthesizes authentic macOS and Windows browser TLS fingerprints.",
      metrics: ["100% JA4 browser parity", "Dynamic cipher ordering", "GREASE extension injection"]
    },
    {
      icon: <Network className="w-5 h-5 text-emerald-400" />,
      title: "Adaptive Residential Circuit Pacing",
      subtitle: "Preventing 429 Cascades & Subnet Bans",
      description: "High-frequency scraping burns proxy IPs fast. PulseGuard uses a token-bucket queue across a distributed residential egress pool. When target latency increases or rate limits loom, traffic automatically backs off and rotates circuits before an IP ban occurs.",
      metrics: ["Multi-region exit nodes", "< 20ms circuit failover", "Token-bucket rate smoothing"]
    },
    {
      icon: <GitCompare className="w-5 h-5 text-amber-400" />,
      title: "Self-Healing DOM Schema Recovery",
      subtitle: "Guarding Against Silent Parser Drift",
      description: "One of the most frustrating bugs in data pipelines is getting a 200 OK with empty fields because a target site updated their frontend CSS class names. PulseGuard's parser detects selector misses and uses semantic proximity heuristics to recover missing fields on the fly.",
      metrics: ["Zero null-field silent corruptions", "Proximity heuristic fallback", "Automatic selector patch logging"]
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      title: "Sub-4ms Edge Proxy Overhead",
      subtitle: "Bypassing Heavy Headless Browsers",
      description: "Spinning up dozens of headless Chromium instances burns gigabytes of memory and introduces heavy page rendering latency. By executing TLS spoofing and AST extraction directly at the network proxy layer, you get browser-grade bypass capabilities with raw HTTP response speeds.",
      metrics: ["< 3.8ms median edge latency", "Zero browser RAM overhead", "10k+ req/sec throughput"]
    }
  ];

  return (
    <section id="architecture" className="py-20 md-py-28 relative bg-canvas">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 mb-3">
            <Cpu className="w-3-5 h-3-5" />
            <span>Architecture & Design</span>
          </div>
          <h2 className="text-3xl sm-text-4xl font-extrabold text-white tracking-tight">
            How PulseGuard Keeps Ingestion Pipelines Running
          </h2>
          <p className="text-slate-400 text-sm sm-text-base mt-3">
            Designed to withstand aggressive bot-detection algorithms and brittle frontend markup without requiring heavy headless browser clusters.
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

              {/* Metric badges */}
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
