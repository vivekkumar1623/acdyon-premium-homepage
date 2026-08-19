import React, { useState } from 'react';
import { SCENARIOS } from '../data/mockScenarios';
import { 
  RotateCw, 
  ShieldCheck, 
  ShieldAlert, 
  Terminal, 
  FileCode, 
  CheckCircle2, 
  AlertOctagon, 
  Cpu, 
  Activity, 
  Copy, 
  Check, 
  SplitSquareVertical 
} from 'lucide-react';

export function InteractivePlayground() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(SCENARIOS[0].id);
  const [usePulseGuard, setUsePulseGuard] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('trace'); // 'trace' | 'domDiff' | 'payload'
  const [copied, setCopied] = useState(false);
  const [stepIndex, setStepIndex] = useState(4);

  const scenario = SCENARIOS.find(s => s.id === selectedScenarioId) || SCENARIOS[0];
  const activeResult = usePulseGuard ? scenario.pulseGuardResult : scenario.directResult;

  const handleRunSimulation = () => {
    setIsRunning(true);
    setStepIndex(1);

    const timer1 = setTimeout(() => setStepIndex(2), 250);
    const timer2 = setTimeout(() => setStepIndex(3), 550);
    const timer3 = setTimeout(() => {
      setStepIndex(4);
      setIsRunning(false);
    }, 850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleCopyPayload = () => {
    if (!activeResult.payload) return;
    navigator.clipboard.writeText(JSON.stringify(activeResult.payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-20 md-py-28 relative bg-surface-panel border-y">
      <div className="container">
        
        {/* Section Header */}
        <div className="flex flex-col md-flex-row md-items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-pill border border-cyan-dim text-xs font-mono text-cyan-300 mb-3">
              <Activity className="w-3-5 h-3-5" />
              <span>Interactive Verification Sandbox</span>
            </div>
            <h2 className="text-3xl sm-text-4xl font-extrabold text-white tracking-tight">
              Test Real Extraction Scenarios
            </h2>
            <p className="text-slate-400 text-sm sm-text-base mt-2 max-w-xl">
              Switch targets and toggle PulseGuard on or off. Watch how the gateway handles anti-bot defenses, TLS fingerprinting, and dynamic DOM mutations in real time.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex items-center gap-3 p-2-5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-1-5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>JA4 Signature: <strong className="text-cyan-300">t13d1516h2</strong></span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="text-slate-300">
              Edge Overhead: <strong className="text-emerald-400">&lt; 3.8ms</strong>
            </div>
          </div>
        </div>

        {/* Main Interactive Demo Container */}
        <div className="bg-surface-card border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Controls Bar */}
          <div className="p-4 sm-p-5 bg-slate-950 border-b border-slate-800 flex flex-col lg-flex-row items-stretch lg-items-center justify-between gap-4">
            
            {/* Scenario Picker */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 mr-1 hidden sm-inline">Target Scenario:</span>
              {SCENARIOS.map((s) => {
                const isSelected = s.id === selectedScenarioId;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedScenarioId(s.id);
                      setStepIndex(4);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-cyan-subtle text-cyan-200 border border-cyan-dim shadow-cyan-glow'
                        : 'bg-slate-900 text-slate-400 hover-text-white border border-slate-800 hover-border-slate-700'
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>

            {/* Gateway Mode Switch & Trigger */}
            <div className="flex items-center gap-3">
              {/* PulseGuard Mode Toggle */}
              <div className="flex items-center gap-2 p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setUsePulseGuard(true)}
                  className={`flex items-center gap-1-5 px-3 py-1-5 rounded-md transition-all cursor-pointer ${
                    usePulseGuard
                      ? 'bg-cyan-subtle text-cyan-300 border border-cyan-dim font-semibold'
                      : 'text-slate-400 hover-text-white'
                  }`}
                >
                  <ShieldCheck className="w-3-5 h-3-5 text-cyan-400" />
                  <span>PulseGuard Active</span>
                </button>
                <button
                  onClick={() => setUsePulseGuard(false)}
                  className={`flex items-center gap-1-5 px-3 py-1-5 rounded-md transition-all cursor-pointer ${
                    !usePulseGuard
                      ? 'bg-rose-subtle text-rose-300 border border-rose-dim font-semibold'
                      : 'text-slate-400 hover-text-white'
                  }`}
                >
                  <ShieldAlert className="w-3-5 h-3-5 text-rose-400" />
                  <span>Raw Client (No Proxy)</span>
                </button>
              </div>

              {/* Execution Trigger */}
              <button
                onClick={handleRunSimulation}
                disabled={isRunning}
                className="btn btn-primary btn-sm flex items-center gap-1-5 disabled:opacity-50"
              >
                <RotateCw className={`w-3-5 h-3-5 ${isRunning ? 'animate-spin' : ''}`} />
                <span>{isRunning ? 'Simulating...' : 'Run Request'}</span>
              </button>
            </div>
          </div>

          {/* Target URL & State Status Bar */}
          <div className="px-4 py-2-5 bg-surface-dark border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 truncate text-slate-300">
              <span className="text-cyan-400 font-semibold">GET</span>
              <span className="text-slate-400 truncate">{scenario.targetUrl}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Defense: <strong className="text-amber-300">{scenario.targetDefense}</strong></span>
              
              <span className={`px-2 py-0-5 rounded font-semibold ${
                activeResult.status === 200 
                  ? 'bg-emerald-subtle text-emerald-300 border border-emerald-dim' 
                  : 'bg-rose-subtle text-rose-300 border border-rose-dim'
              }`}>
                HTTP {activeResult.status} {activeResult.statusText}
              </span>
            </div>
          </div>

          {/* Sandbox Body */}
          <div className="grid grid-cols-1 lg-grid-cols-12 min-h-480">
            
            {/* Left Column: Multi-tab Terminal & Output */}
            <div className="lg-col-span-8 border-b lg-border-b-0 lg-border-r border-slate-800 flex flex-col bg-surface-dark">
              
              {/* Tab Header */}
              <div className="flex items-center justify-between px-4 pt-3 border-b border-slate-800 bg-slate-950">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('trace')}
                    className={`flex items-center gap-1-5 pb-2-5 px-2 text-xs font-mono border-b-2 transition-all cursor-pointer ${
                      activeTab === 'trace'
                        ? 'border-cyan-active text-cyan-300 font-semibold'
                        : 'border-transparent text-slate-400 hover-text-white'
                    }`}
                  >
                    <Terminal className="w-3-5 h-3-5" />
                    <span>Live Wire Trace</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('domDiff')}
                    className={`flex items-center gap-1-5 pb-2-5 px-2 text-xs font-mono border-b-2 transition-all cursor-pointer ${
                      activeTab === 'domDiff'
                        ? 'border-cyan-active text-cyan-300 font-semibold'
                        : 'border-transparent text-slate-400 hover-text-white'
                    }`}
                  >
                    <SplitSquareVertical className="w-3-5 h-3-5" />
                    <span>DOM Drift & AST Diff</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('payload')}
                    className={`flex items-center gap-1-5 pb-2-5 px-2 text-xs font-mono border-b-2 transition-all cursor-pointer ${
                      activeTab === 'payload'
                        ? 'border-cyan-active text-cyan-300 font-semibold'
                        : 'border-transparent text-slate-400 hover-text-white'
                    }`}
                  >
                    <FileCode className="w-3-5 h-3-5" />
                    <span>Emitted JSON Payload</span>
                  </button>
                </div>

                {activeTab === 'payload' && activeResult.payload && (
                  <button
                    onClick={handleCopyPayload}
                    className="flex items-center gap-1 px-2 py-1 mb-2 rounded bg-slate-900 hover-bg-slate-800 text-2xs font-mono text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                )}
              </div>

              {/* Tab 1: Live Wire Trace */}
              {activeTab === 'trace' && (
                <div className="p-5 font-mono text-xs text-slate-300 leading-relaxed overflow-y-auto flex-1 space-y-2">
                  <div className="text-slate-500 pb-1 border-b border-slate-800">
                    // Real-time egress protocol stream for {scenario.name}
                  </div>
                  
                  {activeResult.terminalLogs.slice(0, stepIndex + 1).map((log, index) => {
                    const isError = log.includes('403') || log.includes('429') || log.includes('CORRUPTED') || log.includes('NULL') || log.includes('Terminated');
                    const isSuccess = log.includes('200 OK') || log.includes('Verified') || log.includes('Bypassed') || log.includes('100%');
                    const isWarn = log.includes('DOM Drift') || log.includes('AST') || log.includes('Paced');

                    return (
                      <div 
                        key={index} 
                        className={`flex items-start gap-2-5 font-mono text-xs p-1 rounded ${
                          isError 
                            ? 'text-rose-300 bg-rose-subtle border border-rose-dim' 
                            : isSuccess 
                            ? 'text-emerald-300 bg-emerald-subtle' 
                            : isWarn
                            ? 'text-amber-300 bg-amber-subtle border border-amber-dim'
                            : 'text-slate-300'
                        }`}
                      >
                        <span className="text-slate-600 select-none">{String(index + 1).padStart(2, '0')}</span>
                        <span>{log}</span>
                      </div>
                    );
                  })}

                  {activeResult.errorMessage && (
                    <div className="mt-4 p-3 rounded-lg bg-rose-subtle border border-rose-dim flex items-start gap-2-5 text-rose-200 text-xs">
                      <AlertOctagon className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0-5" />
                      <div>
                        <strong>Failure Alert:</strong> {activeResult.errorMessage}
                      </div>
                    </div>
                  )}

                  {usePulseGuard && (
                    <div className="mt-4 p-3 rounded-lg bg-emerald-subtle border border-emerald-dim flex items-start gap-2-5 text-emerald-200 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0-5" />
                      <div>
                        <strong>Resilience Pipeline Healthy:</strong> Ingestion succeeded with zero Cloudflare/Akamai friction and zero data corruption.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: DOM Mutation & AST Diff */}
              {activeTab === 'domDiff' && (
                <div className="p-5 font-mono text-xs text-slate-300 leading-relaxed overflow-y-auto flex-1 space-y-4">
                  <div className="text-slate-400 text-xs">
                    Target site deployed a frontend update altering markup. Here is how PulseGuard's structural AST parser resolves it vs standard static regex/selectors:
                  </div>

                  <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
                    <div className="p-3-5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-2xs uppercase font-bold text-slate-400 mb-2 flex items-center justify-between">
                        <span>Original Expected Markup</span>
                        <span className="text-slate-500">Target v1.4</span>
                      </div>
                      <pre className="text-2xs text-slate-400 overflow-x-auto">
{`<div class="product-item">
  <h1 class="title">RTX 5090</h1>
  <span class="price-curr-x9b2">$1,999.00</span>
  <span class="stock-badge">In Stock</span>
</div>`}
                      </pre>
                    </div>

                    <div className="p-3-5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-2xs uppercase font-bold text-amber-400 mb-2 flex items-center justify-between">
                        <span>Mutated Target Markup (Overnight)</span>
                        <span className="text-amber-400">Target v1.5 (Obfuscated)</span>
                      </div>
                      <pre className="text-2xs text-amber-200 overflow-x-auto">
{`<div class="p-card-root">
  <h1 class="p-heading">RTX 5090</h1>
  <div data-testid="live-price" class="hsh_941z">$1,999.00</div>
  <div class="inventory-status">Available</div>
</div>`}
                      </pre>
                    </div>
                  </div>

                  {/* AST Recovery Insight */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-cyan-dim">
                    <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>AST Structural Recovery Heuristic</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-normal">
                      When <code className="text-rose-300 font-mono">span.price-curr-x9b2</code> matched 0 nodes, PulseGuard analyzed the DOM tree topology. By detecting currency symbols (<code className="text-cyan-300 font-mono">$</code>) in proximity to the primary heading container, it automatically synthesized the fallback selector <code className="text-emerald-300 font-mono">[data-testid="live-price"]</code> and emitted a hotpatch alert.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Emitted JSON Payload */}
              {activeTab === 'payload' && (
                <div className="p-5 font-mono text-xs text-slate-300 overflow-y-auto flex-1">
                  {activeResult.payload ? (
                    <pre className="text-emerald-300 leading-relaxed overflow-x-auto p-3 rounded-lg bg-slate-950 border border-slate-800">
                      {JSON.stringify(activeResult.payload, null, 2)}
                    </pre>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500">
                      <AlertOctagon className="w-8 h-8 text-rose-400 mb-2" />
                      <div className="text-rose-400 font-bold">Null Payload Emitted</div>
                      <div className="text-xs text-slate-400 max-w-sm mt-1">
                        The raw request was intercepted by the target WAF or rate-limiter. No structured data was received.
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Telemetry */}
            <div className="lg-col-span-4 p-5 bg-slate-950 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-4 flex items-center gap-1-5">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Wire Telemetry</span>
                </h3>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-2xs text-slate-400 font-mono">Pipeline Status</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${
                        activeResult.status === 200 ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}></span>
                      <span className="text-sm font-bold text-slate-100 font-mono">
                        {activeResult.status === 200 ? 'Healthy (200 OK)' : `Blocked (${activeResult.status})`}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-2xs text-slate-400 font-mono">TLS ClientHello JA4</div>
                    <div className="text-xs font-bold text-cyan-300 font-mono truncate mt-1">
                      {activeResult.ja4}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-2xs text-slate-400 font-mono">Egress IP Node</div>
                    <div className="text-xs font-semibold text-slate-200 font-mono mt-1">
                      {activeResult.ipStatus}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-2xs text-slate-400 font-mono">DOM Schema Integrity</div>
                    <div className={`text-xs font-semibold font-mono mt-1 ${
                      activeResult.driftStatus.includes('CRITICAL') ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {activeResult.driftStatus}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-2xs text-slate-400 font-mono">Roundtrip Latency</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-slate-100 font-mono">{activeResult.latency}</span>
                      {activeResult.edgeOverhead && (
                        <span className="text-xs text-emerald-400 font-mono font-semibold">
                          Edge: {activeResult.edgeOverhead}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3-5 rounded-xl bg-cyan-subtle border border-cyan-dim text-xs text-cyan-200 font-mono leading-normal">
                💡 <strong>Under the Hood:</strong> PulseGuard replaces bulky headless browsers by replaying clean TLS/JA4 signatures directly over high-speed edge proxies.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
