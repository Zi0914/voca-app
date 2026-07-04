'use client';

import { useMemo } from 'react';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: '2-digit',
  year: 'numeric',
});

type Props = {
  note: string;
  onOpenNote: () => void;
};

export default function HomeCaptureCard({ note, onOpenNote }: Props) {
  const dateText = useMemo(() => dateFormatter.format(new Date()), []);

  return (
    <section className="flex flex-1 flex-col gap-6">
      <div className="space-y-2">
        <p className="text-[30px] font-extrabold leading-none text-[#243238]">Hi Liz,</p>
        <p className="text-[18px] leading-[24px] text-[#61777B]">let’s keep today’s words</p>
      </div>

      <button
        type="button"
        onClick={onOpenNote}
        className="relative mx-auto flex h-[clamp(24rem,calc(100vh-19.75rem),34rem)] w-full max-w-[440px] flex-col rounded-[30px] border-[1px] border-[rgba(255,255,255,0.72)] bg-[rgba(255,253,245,0.78)] p-5 shadow-lingi backdrop-blur-sm"
      >
        <img
          src="/lingi-parrot.png"
          alt="Lingi parrot"
          className="pointer-events-none absolute right-[16px] top-[12px] h-[64px] w-[56px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] parrot-bob"
        />
        <div className="mt-3 self-start text-[12px] font-medium leading-none text-[#0E6F74]">{dateText}</div>

        <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-[18px] bg-[rgba(221,239,233,0.82)] p-6">
          <div className="pt-1 text-[16px] leading-[28px] text-[#61777B]">
            {note.trim() ? note.trim() : 'Type here to catch what you want to remember...'}
          </div>
        </div>
      </button>
    </section>
  );
}
