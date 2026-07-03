'use client';

import { BookOpen, Home } from 'lucide-react';

type Props = {
  active: 'home' | 'library';
  onChange: (value: 'home' | 'library') => void;
};

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 mx-auto flex w-full max-w-[480px] justify-center px-5 pb-[env(safe-area-inset-bottom)] min-[400px]:px-6">
      <div className="relative w-full max-w-[432px] rounded-[32px] border-[1px] border-[rgba(255,255,255,0.70)] bg-[linear-gradient(180deg,rgba(255,255,255,0.60),rgba(244,247,238,0.58),rgba(233,245,248,0.64))] p-2 shadow-nav backdrop-blur-md">
        <span className={`pointer-events-none absolute top-2 bottom-2 left-2 w-[calc(50%-12px)] rounded-[24px] bg-[rgba(255,255,255,0.72)] shadow-[inset_0_6px_18px_rgba(0,140,149,0.04)] transition-transform duration-300 ease-out ${active === 'library' ? 'translate-x-[calc(100%+8px)]' : ''}`} />
        <div className="relative grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onChange('home')}
            className="group flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-[24px] px-3 text-[12px] leading-none"
          >
            <Home size={28} className={active === 'home' ? 'stroke-[2.35] text-[#008C95]' : 'stroke-[2.2] text-[#61777B]'} />
            <span className={active === 'home' ? 'text-[#008C95]' : 'text-[#61777B]'}>Home</span>
          </button>
          <button
            type="button"
            onClick={() => onChange('library')}
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
