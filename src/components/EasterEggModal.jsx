import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function EasterEggModal({ isOpen, onClose }) {
  const [commandInput, setCommandInput] = useState('');
  const [outputLogs, setOutputLogs] = useState([
    'PulseGuard Ghost Protocol Initialized [v2.4.9-edge]',
    'JA4 Fingerprint Engine: ACTIVE (Hardware TLS accelerator bound)',
    'Egress Circuit: 128 residential nodes synced across Frankfurt, Ashburn, Tokyo',
    'Type "help" or "bypass" for diagnostic commands.'
  ]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim().toLowerCase();
    const newLogs = [...outputLogs, `> ${commandInput}`];

    if (cmd === 'help') {
      newLogs.push(
        'Available diagnostic commands:',
        '  status        - Show edge cluster health and JA4 matrix',
        '  matrix        - Stream live egress node telemetry',
        '  bypass        - Simulate full anti-bot evasion bypass test',
        '  clear         - Clear terminal buffer',
        '  exit          - Close developer HUD'
      );
    } else if (cmd === 'status') {
      newLogs.push(
        'CLUSTER STATUS: 100% HEALTHY',
        '• Active TLS Ciphers: TLS_AES_128_GCM_SHA256, TLS_CHACHA20_POLY1305_SHA256',
        '• Egress Node Latency: 3.2ms median',
        '• AST Schema Integrity: 0 corruptions detected'
      );
    } else if (cmd === 'matrix') {
      newLogs.push(
        '[FRA-01] 200 OK | JA4: t13d1516h2_8daaf | Latency: 2.8ms',
        '[IAD-04] 200 OK | JA4: t13d1516h2_safari | Latency: 3.4ms',
        '[NRT-09] 200 OK | JA4: t13d1516h2_chrome | Latency: 4.1ms'
      );
    } else if (cmd === 'bypass' || cmd.includes('bypass')) {
      newLogs.push(
        '⚡ [SIMULATION] Launching Ghost Protocol Stealth Probe...',
        '✓ Target TLS Handshake intercepted & randomized',
        '✓ Akamai / Cloudflare Turnstile sensor passed seamlessly',
        '✓ Clean structured payload delivered in 142ms'
      );
    } else if (cmd === 'clear') {
      setOutputLogs(['Terminal buffer cleared.']);
      setCommandInput('');
      return;
    } else if (cmd === 'exit') {
      onClose();
      return;
    } else {
      newLogs.push(`Command not recognized: "${commandInput}". Type "help" for list.`);
    }

    setOutputLogs(newLogs);
    setCommandInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-modal-backdrop backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl bg-surface-dark border border-cyan-dim rounded-2xl shadow-cyan-glow overflow-hidden font-mono text-xs"
        role="dialog"
        aria-modal="true"
      >
        {/* HUD Window Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2-5">
            <span className="w-2-5 h-2-5 rounded-full bg-cyan-400 animate-ping-slow"></span>
            <span className="font-bold text-cyan-300 tracking-wide uppercase">
              ⚡ Ghost Protocol // Developer HUD [Easter Egg]
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover-text-white hover-bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* HUD ASCII Banner */}
        <div className="p-4 bg-canvas border-b border-slate-800 text-cyan-400 select-none overflow-x-auto text-micro leading-tight">
          <pre>
{`  ____            _               ____                          _ 
 |  _ \\ _   _  __| |___  ___     / ___|_   _  __ _ _ __ __| |
 | |_) | | | |/ _\` / __|/ _ \\   | |  _| | | |/ _\` | '__/ _\` |
 |  __/| |_| | (_| \\__ \\  __/   | |_| | |_| | (_| | | | (_| |
 |_|    \\__,_|\\__,_|___/\\___|    \\____|\\__,_|\\__,_|_|  \\__,_|`}
          </pre>
        </div>

        {/* Terminal Logs Output */}
        <div className="p-4 h-64 overflow-y-auto space-y-1-5 text-slate-300 bg-surface-dark">
          {outputLogs.map((log, index) => (
            <div 
              key={index}
              className={log.startsWith('>') ? 'text-cyan-400 font-bold' : log.includes('✓') ? 'text-emerald-300' : 'text-slate-300'}
            >
              {log}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCommandSubmit} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <span className="text-cyan-400 font-bold pl-2">$</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Type 'help', 'status', 'matrix', 'bypass', or 'clear'..."
            className="w-full bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none font-mono text-xs"
            autoFocus
            style={{ border: 'none', outline: 'none' }}
          />
          <button 
            type="submit" 
            className="px-3 py-1 rounded bg-cyan-pill hover-bg-slate-800 text-cyan-300 border border-cyan-dim text-xs font-mono transition-colors cursor-pointer"
          >
            Execute
          </button>
        </form>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-canvas border-t border-slate-900 flex items-center justify-between text-micro text-slate-500 font-mono">
          <span>Easter Egg Activated via Konami Code or ⌘K</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
