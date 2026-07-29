'use client';

import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
});

type Props = {
  onOpenNote: () => void;
};

export default function HomeCaptureCard({ onOpenNote }: Props) {
  const dateText = useMemo(() => dateFormatter.format(new Date()), []);

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="shrink-0 space-y-2">
        <p className="font-lingiGreeting text-[28px] font-medium leading-[34px] text-[#243238]">
          Hi Liz, welcome back!
        </p>
        <p className="font-lingiText text-[16px] font-normal leading-[23px] text-[#61777B]">
          keep what you notice, learn at your pace
        </p>
      </div>

      <div className="voca-capture-frame relative mx-auto flex min-h-0 w-full max-w-[440px] flex-1 flex-col overflow-hidden rounded-[30px] border border-[rgba(0,140,149,0.2)] p-6 backdrop-blur-sm">
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-2 py-5 text-center">
          <div className="rounded-full border border-white/60 bg-[rgba(255,253,245,0.58)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0E6F74]">
            Today · {dateText}
          </div>
          <h2 className="font-lingiDisplay mt-5 max-w-[320px] text-[27px] font-normal leading-[34px] text-[#243238]">
            What caught your attention today?
          </h2>
          <img
            src="/lingi-parrot.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none mt-5 h-[112px] w-[104px] object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.08)]"
          />

          <p className="mt-5 max-w-[310px] text-[15px] leading-[24px] text-[#61777B]">
            Keep a word, phrase, or sentence here and come back to it later.
          </p>

          <button
            type="button"
            onClick={onOpenNote}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#008C95] px-5 text-[14px] font-semibold text-white transition-colors active:bg-[#006F76] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95] focus-visible:ring-offset-2"
          >
            Start a note
            <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
