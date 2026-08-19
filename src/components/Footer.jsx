import React from 'react';
import { ShieldCheck, Command } from 'lucide-react';

export function Footer({ onOpenEasterEgg }) {
  return (
    <footer className="py-14 bg-surface-dark border-t border-slate-800 text-slate-400 font-sans text-xs">
      <div className="container">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md-grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand */}
          <div className="md-col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base font-sans">
              <div className="w-6 h-6 rounded bg-cyan-subtle border border-cyan-dim flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-3-5 h-3-5" />
              </div>
              <span>PulseGuard Ingestion Gateway</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              The high-resilience egress runtime for data extraction pipelines. Eliminates headless browser bloat, randomizes TLS/JA4 signatures, and auto-heals broken DOM schemas.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1-5 px-2 py-0-5 rounded bg-emerald-subtle border border-emerald-dim text-2xs font-mono text-emerald-300">
                <span className="w-1-5 h-1-5 rounded-full bg-emerald-400"></span>
                <span>Systems Operational</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-2xs font-mono text-slate-500">v2.4.9 Edge Protocol</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2-5">
            <div className="text-white font-bold text-xs uppercase font-mono tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2" style={{ listStyle: 'none' }}>
              <li>
                <a href="#playground" className="text-slate-400 hover-text-cyan transition-colors" style={{ textDecoration: 'none' }}>
                  Resilience Sandbox
                </a>
              </li>
              <li>
                <a href="#architecture" className="text-slate-400 hover-text-cyan transition-colors" style={{ textDecoration: 'none' }}>
                  Architecture & Pillars
                </a>
              </li>
              <li>
                <a href="#integration" className="text-slate-400 hover-text-cyan transition-colors" style={{ textDecoration: 'none' }}>
                  Drop-in Integration
                </a>
              </li>
              <li>
                <a href="#specs" className="text-slate-400 hover-text-cyan transition-colors" style={{ textDecoration: 'none' }}>
                  Telemetry & Benchmarks
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Diagnostics & Easter Egg */}
          <div className="space-y-2-5">
            <div className="text-white font-bold text-xs uppercase font-mono tracking-wider">
              Diagnostics
            </div>
            <ul className="space-y-2" style={{ listStyle: 'none' }}>
              <li>
                <button 
                  onClick={onOpenEasterEgg}
                  className="hover-text-cyan transition-colors flex items-center gap-1 text-left bg-transparent border-transparent cursor-pointer text-slate-400 text-xs"
                >
                  <Command className="w-3 h-3 text-cyan-400" />
                  <span>Developer HUD (⌘K)</span>
                </button>
              </li>
              <li>
                <span className="text-slate-500 font-mono text-2xs">
                  Konami: ↑ ↑ ↓ ↓ ← → ← → B A
                </span>
              </li>
              <li>
                <span className="text-slate-500 font-mono text-2xs">
                  Zero Fabricated Metrics Policy
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm-flex-row items-center justify-between gap-4 text-2xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} PulseGuard Engineering. Built for high-friction data pipelines.
          </div>
          <div className="flex items-center gap-4">
            <a href="#playground" className="text-slate-400 hover-text-cyan transition-colors" style={{ textDecoration: 'none' }}>
              Back to Top ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
