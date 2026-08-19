import React, { useState } from 'react';
import { ArrowRight, Copy, Check, ShieldAlert, Cpu, Network, Terminal } from 'lucide-react';

export function Hero() {
  const [copied, setCopied] = useState(false);
  const sampleCurl = 'curl -x http://gateway.pulseguard.dev:8080 -H "X-Pulse-Key: demo" https://target.site/data';

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCurl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md-pt-40 md-pb-28 bg-grid-pattern">
      <div className="container flex flex-col items-center text-center">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3-5 py-1-5 rounded-full bg-slate-900 border border-cyan-dim text-xs font-mono text-cyan-300 mb-8 shadow-cyan-glow">
          <span className="w-1-5 h-1-5 rounded-full bg-cyan-400"></span>
          <span>Zero Headless Overhead • JA4 Fingerprint Shuffling • AST Schema Recovery</span>
        </div>

        <h1 className="text-4xl sm-text-5xl md-text-6xl lg-text-7xl font-extrabold tracking-tight max-w-4xl text-white mb-6 leading-tight">
          Keep web scrapers from getting <span className="headline-cyan-gradient">blocked</span> or <span className="headline-amber-gradient">silently corrupted</span>.
        </h1>

        <p className="text-base sm-text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
          PulseGuard is a drop-in proxy gateway for data extraction pipelines. It handles TLS/JA4 fingerprint randomization, adaptive residential pacing, and self-healing DOM schema recovery—so your scrapers keep running smoothly without burning IPs.
        </p>

        <div className="flex flex-col sm-flex-row items-center gap-4 w-full sm-w-auto justify-center mb-12">
          <a 
            href="#playground" 
            className="btn btn-primary btn-lg w-full sm-w-auto text-base shadow-cyan-glow"
          >
            <span>Launch Live Resilience Sandbox</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a 
            href="#integration" 
            className="btn btn-secondary btn-lg w-full sm-w-auto text-base font-mono text-sm"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Integration Snippets</span>
          </a>
        </div>

        {/* Quick CLI Drop-in */}
        <div className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3 text-left shadow-2xl">
          <div className="flex items-center gap-2-5 overflow-hidden pl-2">
            <span className="text-cyan-400 font-mono text-xs font-semibold">$</span>
            <code className="text-xs sm-text-sm font-mono text-slate-300 truncate">
              {sampleCurl}
            </code>
          </div>
          <button 
            onClick={handleCopy}
            title="Copy command"
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover-border-cyan text-slate-300 hover-text-white transition-all flex-shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm-grid-cols-3 gap-4 w-full max-w-4xl mt-14 text-left">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-subtle border border-cyan-dim text-cyan-400 mt-0-5 flex-shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100">Zero Browser Bloat</div>
              <div className="text-xs text-slate-400 mt-1 leading-normal">
                Pure transport-layer TLS synthesis. Replaces heavy headless Chromium clusters with fast edge proxying.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-subtle border border-emerald-dim text-emerald-400 mt-0-5 flex-shrink-0">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100">Dynamic JA4 Cycling</div>
              <div className="text-xs text-slate-400 mt-1 leading-normal">
                Randomizes cipher suites, ALPN frames, and TCP window parameters to match real consumer browsers.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-subtle border border-amber-dim text-amber-400 mt-0-5 flex-shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100">DOM Drift Protection</div>
              <div className="text-xs text-slate-400 mt-1 leading-normal">
                Recovers target fields via semantic proximity heuristics when websites update class names overnight.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
