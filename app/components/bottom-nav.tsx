'use client';

import { useState } from 'react';
import { BookOpen, Home } from 'lucide-react';

export default function BottomNav() {
  const [active, setActive] = useState<'home' | 'library'>('home');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 mx-auto flex w-full max-w-[480px] justify-center px-5 pb-[env(safe-area-inset-bottom)] min-[400px]:px-6">
      <div className="relative w-full max-w-[432px] rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.60),rgba(244,247,238,0.58),rgba(233,245,248,0.64))] p-2 shadow-nav backdrop-blur-md">
        <span className={`pointer-events-none absolute top-2 bottom-2 left-2 w-[calc(50%-0.75rem)] rounded-[24px] bg-white/72 shadow-[inset_0_0_0_1px_rgba(0,140,149,0.08),0_0_0_0_#fff] transition-transform duration-300 ease-out ${active === 'library' ? 'translate-x-[calc(100%+0.5rem)]' : ''}`} />
        <div className="relative grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setActive('home')}
            className="group flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-[24px] px-3 text-[12px] leading-none"
          >
            <Home size={28} className={active === 'home' ? 'stroke-[2.35] text-[#008C95]' : 'stroke-[2.2] text-[#61777B]'} />
            <span className={active === 'home' ? 'text-[#008C95]' : 'text-[#61777B]'}>Home</span>
          </button>
          <button
            type="button"
            onClick={() => setActive('library')}
            className="group flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-[24px] px-3 text-[12px] leading-none"
          >
            <BookOpen size={28} className={active === 'library' ? 'stroke-[2.35] text-[#008C95]' : 'stroke-[2.2] text-[#61777B]'} />
            <span className={active === 'library' ? 'text-[#008C95]' : 'text-[#61777B]'}>Library</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
