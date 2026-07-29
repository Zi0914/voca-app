'use client';

import { BookOpen, Home } from 'lucide-react';

type Props = {
  active: 'home' | 'library';
  onChange: (value: 'home' | 'library') => void;
};

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-30 mx-auto flex w-full max-w-[480px] justify-center px-5 min-[400px]:px-6">
      <div className="relative w-full max-w-[432px] rounded-[32px] border border-[rgba(0,140,149,0.10)] bg-[rgba(234,243,240,0.94)] p-2 shadow-[0_18px_46px_rgba(64,93,91,0.18)] backdrop-blur-md">
        <span className={`pointer-events-none absolute top-2 bottom-2 left-2 w-[calc(50%-12px)] rounded-[24px] border border-[rgba(0,140,149,0.10)] bg-[#FEFEFE] transition-transform duration-300 ease-out ${active === 'library' ? 'translate-x-[calc(100%+8px)]' : ''}`} />
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
