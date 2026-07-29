'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

type Props = {
  note: string;
  mode?: 'create' | 'draft' | 'edit';
  noteDate?: string;
  onNoteChange: (value: string) => void;
  onBack: () => void;
  onSaved: (text: string) => void;
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
});

export default function WritingPage({ note, mode = 'create', noteDate, onNoteChange, onBack, onSaved }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dateText = useMemo(() => dateFormatter.format(noteDate ? new Date(noteDate) : new Date()), [noteDate]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSave = () => {
    const trimmedNote = note.trim();
    if (!trimmedNote || isSaving) {
      return;
    }

    setIsSaving(true);

    window.setTimeout(() => {
      setIsSaving(false);
      onSaved(trimmedNote);
    }, 560);
  };

  return (
    <section
      className={`voca-editor-page mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))] ${
        isSaving ? 'animate-note-save-away' : ''
      }`}
    >
      <header className="voca-editor-header grid shrink-0 grid-cols-[72px_1fr_72px] items-center border-b border-[rgba(97,119,123,0.12)] px-3 pb-4 pt-[max(1rem,env(safe-area-inset-top))] min-[400px]:px-4">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#008C95] transition active:scale-[0.96] active:bg-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95]"
          aria-label="Back"
        >
          <ArrowLeft size={21} strokeWidth={2.2} />
        </button>
        <p className="truncate px-1 text-center text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0E6F74]">
          {mode === 'edit' ? 'Editing' : mode === 'draft' ? 'Draft' : 'Today'} · {dateText}
        </p>
        <button
          type="button"
          onClick={handleSave}
          disabled={!note.trim() || isSaving}
          className="inline-flex h-9 items-center justify-center rounded-full px-4 text-[13px] font-semibold text-white transition-colors disabled:bg-[#B9C8C3] enabled:bg-[#008C95] enabled:active:bg-[#007B83] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95] focus-visible:ring-offset-2"
        >
          Save
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-3 min-[400px]:px-4">
        <textarea
          ref={textareaRef}
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder="Type a word, phrase, or sentence you’d like to remember here..."
          aria-label="Vocabulary note"
          className="voca-note-input min-h-[18rem] w-full flex-1 resize-none overflow-y-auto bg-transparent py-7 text-left text-[16px] leading-[24px] text-black outline-none placeholder:text-[#61777B]"
        />
      </div>
    </section>
  );
}
