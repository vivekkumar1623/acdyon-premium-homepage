import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractivePlayground } from './components/InteractivePlayground';
import { Architecture } from './components/Architecture';
import { CodeIntegration } from './components/CodeIntegration';
import { ComparisonSpecs } from './components/ComparisonSpecs';
import { EasterEggModal } from './components/EasterEggModal';
import { Footer } from './components/Footer';

export function App() {
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);

  const konamiCode = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Shortcut: Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsEasterEggOpen(prev => !prev);
        return;
      }

      // 2. Konami Code detection
      const key = e.key;
      const expectedKey = konamiCode[konamiProgress];

      if (key.toLowerCase() === expectedKey.toLowerCase()) {
        const nextProgress = konamiProgress + 1;
        if (nextProgress === konamiCode.length) {
          setIsEasterEggOpen(true);
          setKonamiProgress(0);
        } else {
          setKonamiProgress(nextProgress);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200 overflow-x-hidden">
      <Navbar onOpenEasterEgg={() => setIsEasterEggOpen(true)} />
      
      <main>
        <Hero />
        <InteractivePlayground />
        <Architecture />
        <CodeIntegration />
        <ComparisonSpecs />
      </main>

      <Footer onOpenEasterEgg={() => setIsEasterEggOpen(true)} />

      <EasterEggModal 
        isOpen={isEasterEggOpen} 
        onClose={() => setIsEasterEggOpen(false)} 
      />
    </div>
  );
}

export default App;
