'use client';

type Props = {
  active: 'home' | 'library';
  onChange: (value: 'home' | 'library') => void;
};

function HomeNavIcon({ selected }: { selected: boolean }) {
  const stroke = selected ? '#BFE5E1' : 'currentColor';

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={selected ? 'text-[#008C95]' : 'text-[#61777B]'}
    >
      <path
        d="M4 10.25 12 3.75l8 6.5v8.5A1.75 1.75 0 0 1 18.25 20.5H5.75A1.75 1.75 0 0 1 4 18.75v-8.5Z"
        fill={selected ? '#008C95' : 'none'}
        stroke={selected ? 'none' : stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M9.5 20.5v-6.25c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v6.25"
        fill={selected ? '#E4EEF1' : 'none'}
        stroke={selected ? 'none' : stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LibraryNavIcon({ selected }: { selected: boolean }) {
  const stroke = selected ? '#BFE5E1' : 'currentColor';

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={selected ? 'text-[#008C95]' : 'text-[#61777B]'}
    >
      <path
        d="M12 6.75C9.6 5.2 6.9 4.7 4 5.25v12.5c2.9-.55 5.6-.05 8 1.5V6.75Z"
        fill={selected ? '#008C95' : 'none'}
        stroke={selected ? 'none' : stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M12 6.75c2.4-1.55 5.1-2.05 8-1.5v12.5c-2.9-.55-5.6-.05-8 1.5V6.75Z"
        fill={selected ? '#008C95' : 'none'}
        stroke={selected ? 'none' : stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M12 6.75v12.5"
        stroke={stroke}
        strokeWidth={selected ? 1.5 : 1.7}
        strokeLinecap="round"
      />
    </svg>
  );
}

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
            aria-current={active === 'home' ? 'page' : undefined}
          >
            <HomeNavIcon selected={active === 'home'} />
            <span className={active === 'home' ? 'text-[#008C95]' : 'text-[#61777B]'}>Home</span>
          </button>
          <button
            type="button"
            onClick={() => onChange('library')}
            className="group flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-full px-3 text-[11px] leading-none"
            aria-current={active === 'library' ? 'page' : undefined}
          >
            <LibraryNavIcon selected={active === 'library'} />
            <span className={active === 'library' ? 'text-[#008C95]' : 'text-[#61777B]'}>Library</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
