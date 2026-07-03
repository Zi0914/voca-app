'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: '2-digit',
  year: 'numeric',
});

export default function HomeCaptureCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const dateText = useMemo(() => dateFormatter.format(new Date()), []);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!showSavedPopup) {
      return;
    }

    const timeout = window.setTimeout(() => setShowSavedPopup(false), 4200);
    return () => window.clearTimeout(timeout);
  }, [showSavedPopup]);

  const handleSave = () => {
    if (!note.trim()) {
      return;
    }

    setIsSaving(true);
    window.setTimeout(() => {
      setIsSaving(false);
      setIsOpen(false);
      setNote('');
      setShowSavedPopup(true);
    }, 560);
  };

  return (
    <section className="flex flex-1 flex-col gap-6">
      <div className="space-y-2">
        <p className="text-[30px] font-extrabold leading-none text-[#243238]">Hi Liz,</p>
        <p className="text-[18px] leading-[24px] text-[#61777B]">let’s keep today’s words</p>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative flex min-h-[24rem] w-full flex-col overflow-hidden rounded-[30px] border border-white/72 bg-white/78 p-5 shadow-lingi backdrop-blur-sm transition-transform duration-150 hover:scale-[0.998]"
      >
        <img
          src="/lingi-parrot.png"
          alt="Lingi parrot"
          className="pointer-events-none absolute right-4 top-3 h-[64px] w-[56px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
        />
        <div className="mt-16 flex h-full flex-col rounded-[18px] bg-[#DDEFE9]/82 p-5">
          <div className="text-[12px] font-medium leading-none text-[#0E6F74]">{dateText}</div>
          <div className="mt-7 text-[16px] leading-[28px] text-[#61777B]">Type here to catch what you want to remember...</div>
        </div>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-20 flex min-h-screen w-full items-start justify-center bg-black/10 px-5 pt-[max(1.25rem,env(safe-area-inset-top))] min-[400px]:px-6">
          <div className={`relative h-full w-full max-w-[480px] ${isSaving ? 'animate-note-save-away' : ''}`}>
            <div className="flex h-full flex-col overflow-hidden rounded-[30px] border border-white/72 bg-white/78 p-5 shadow-lingi backdrop-blur-sm">
              <div className="mb-4 grid h-[48px] grid-cols-[72px_1fr_72px] items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#008C95] bg-white/28 text-[#008C95]"
                >
                  <ArrowLeft size={16} />
                </button>
                <div className="text-center text-[11px] font-medium leading-none text-[#0E6F74]">{dateText}</div>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!note.trim() || isSaving}
                  className="inline-flex h-8 items-center justify-center rounded-[12px] px-5 text-[13px] font-medium text-white transition-colors disabled:bg-[#B9C8C3] enabled:bg-[#008C95]"
                >
                  <Save size={14} className="mr-2" />
                  Save
                </button>
              </div>
              <div className="flex-1 overflow-hidden rounded-[18px] bg-[#DDEFE9]/82 p-5">
                <textarea
                  ref={textareaRef}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Type here to catch what you want to remember..."
                  className="h-full w-full resize-none bg-transparent text-[16px] leading-[28px] text-[#243238] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showSavedPopup ? (
        <div className="pointer-events-none fixed bottom-[calc(92px+env(safe-area-inset-bottom))] left-1/2 z-30 w-[min(440px,calc(100%-40px))] -translate-x-1/2 rounded-[22px] border border-white/75 bg-white/78 px-4 py-4 shadow-[0_18px_42px_rgba(64,93,91,0.16)] backdrop-blur-md animate-saved-pop-in">
          <p className="text-[15px] font-medium text-[#243238]">Saved to Library</p>
          <p className="mt-1 text-[13px] text-[#61777B]">You can find it in Library anytime.</p>
        </div>
      ) : null}
    </section>
  );
}
