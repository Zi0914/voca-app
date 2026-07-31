'use client';

import { BookOpen, Home } from 'lucide-react';

type Props = {
  active: 'home' | 'library';
  onChange: (value: 'home' | 'library') => void;
};

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-30 mx-auto flex w-full max-w-[480px] justify-center px-3 min-[400px]:px-4">
      <div className="relative w-full max-w-[300px] rounded-full border border-[#E4E9E7] bg-[#F8FAF9] p-1 shadow-[0_8px_24px_rgba(45,61,68,0.10)]">
        <span className={`pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%-8px)] rounded-full bg-[#E4EEF1] transition-transform duration-300 ease-out ${active === 'library' ? 'translate-x-[calc(100%+8px)]' : ''}`} />
        <div className="relative grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onChange('home')}
            className="group flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-full px-3 text-[11px] leading-none"
          >
            <Home
              size={24}
              className={active === 'home' ? 'stroke-[2.35] text-[#008C95]' : 'stroke-[2.2] text-[#61777B]'}
            />
            <span className={active === 'home' ? 'text-[#008C95]' : 'text-[#61777B]'}>Home</span>
          </button>
          <button
            type="button"
            onClick={() => onChange('library')}
            className="group flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-full px-3 text-[11px] leading-none"
          >
            <BookOpen size={24} className={active === 'library' ? 'stroke-[2.35] text-[#008C95]' : 'stroke-[2.2] text-[#61777B]'} />
            <span className={active === 'library' ? 'text-[#008C95]' : 'text-[#61777B]'}>Library</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
