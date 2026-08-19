import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Command } from 'lucide-react';

export function Navbar({ onOpenEasterEgg }) {
  const [scrolled, setScrolled] = useState(false);
  const uptime = '99.98%';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${
      scrolled 
        ? 'bg-surface-panel backdrop-blur-md border-b border-slate-800 py-3 shadow-lg' 
        : 'py-5 border-b border-transparent'
    }`}>
      <div className="container flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2-5" style={{ textDecoration: 'none' }}>
          <div className="w-9 h-9 rounded-lg bg-cyan-subtle border border-cyan-dim flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1-5 font-sans">
              PulseGuard
              <span className="text-micro uppercase font-mono px-1-5 py-0-5 rounded bg-cyan-pill text-cyan-300 border border-cyan-dim font-semibold">
                Gateway
              </span>
            </span>
          </div>
        </a>

        {/* Live Status Indicator & Nav Links */}
        <nav className="hidden md-flex items-center gap-7">
          <div className="flex items-center gap-2 px-2-5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping-slow"></span>
            <span>Edge Cluster: <strong className="text-emerald-400 font-semibold">{uptime}</strong></span>
          </div>

          <a href="#playground" className="text-sm font-medium text-slate-300 hover-text-cyan transition-colors" style={{ textDecoration: 'none' }}>
            Resilience Sandbox
          </a>
          <a href="#architecture" className="text-sm font-medium text-slate-300 hover-text-cyan transition-colors" style={{ textDecoration: 'none' }}>
            Architecture
          </a>
          <a href="#integration" className="text-sm font-medium text-slate-300 hover-text-cyan transition-colors" style={{ textDecoration: 'none' }}>
            Integration
          </a>
          <a href="#specs" className="text-sm font-medium text-slate-300 hover-text-cyan transition-colors" style={{ textDecoration: 'none' }}>
            Telemetry Specs
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2-5">
          <button 
            onClick={onOpenEasterEgg}
            title="Open Developer HUD (Shortcut: Cmd/Ctrl + K)"
            className="hidden sm-flex items-center gap-1-5 px-2-5 py-1-5 rounded-md bg-slate-900 border border-slate-800 hover-border-slate-700 text-slate-400 hover-text-white text-xs font-mono transition-colors cursor-pointer"
          >
            <Command className="w-3-5 h-3-5 text-cyan-400" />
            <span>HUD</span>
            <kbd className="px-1 py-0-5 rounded bg-slate-800 text-micro text-slate-300">⌘K</kbd>
          </button>

          <a 
            href="#playground"
            className="btn btn-primary btn-sm flex items-center gap-1-5"
          >
            <span>Live Sandbox</span>
            <ArrowRight className="w-3-5 h-3-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
