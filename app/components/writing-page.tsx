'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

type Props = {
  note: string;
  onNoteChange: (value: string) => void;
  onBack: () => void;
  onSaved: () => void;
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: '2-digit',
  year: 'numeric',
});

export default function WritingPage({ note, onNoteChange, onBack, onSaved }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dateText = useMemo(() => dateFormatter.format(new Date()), []);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSave = () => {
    const trimmedNote = note.trim();
    if (!trimmedNote || isSaving) {
      return;
    }

    setIsSaving(true);
    const entry = { id: `${Date.now()}`, text: trimmedNote, addedAt: new Date().toISOString() };

    try {
      const raw = localStorage.getItem('lingi_notes');
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(entry);
      localStorage.setItem('lingi_notes', JSON.stringify(arr));
    } catch (e) {
      // Saving is best-effort for this local prototype.
    }

    window.setTimeout(() => {
      setIsSaving(false);
      onNoteChange('');
      onSaved();
    }, 560);
  };

  return (
    <section className="flex min-h-screen w-full flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] min-[400px]:px-6">
      <div className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-[30px] border border-[rgba(255,255,255,0.72)] bg-[rgba(255,253,245,0.78)] p-5 shadow-lingi backdrop-blur-sm ${isSaving ? 'animate-note-save-away' : ''}`}>
        <div className="mb-4 grid h-[48px] shrink-0 grid-cols-[72px_1fr_72px] items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#008C95] bg-white/28 text-[#008C95]"
            aria-label="Back"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-center text-[11px] font-medium leading-none text-[#0E6F74]">
            {dateText}
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={!note.trim() || isSaving}
            className="inline-flex h-8 items-center justify-center rounded-[12px] px-5 text-[13px] font-medium text-white transition-colors disabled:bg-[#B9C8C3] enabled:bg-[#008C95]"
          >
            Save
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden rounded-[18px] bg-[rgba(221,239,233,0.82)] p-5">
          <textarea
            ref={textareaRef}
            value={note}
            onChange={(event) => onNoteChange(event.target.value)}
            placeholder="Type here to catch what you want to remember..."
            className="h-full w-full resize-none overflow-y-auto bg-transparent text-[16px] leading-[28px] text-[#243238] outline-none placeholder:text-[#61777B]"
          />
        </div>
      </div>
    </section>
  );
}
