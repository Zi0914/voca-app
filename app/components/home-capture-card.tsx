'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import styles from './home-capture-card.module.css';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
});

type Props = {
  note: string;
  onNoteChange: (value: string) => void;
  onSaveNote: (text: string) => void;
  onKeepDraft: (text: string) => void;
};

export default function HomeCaptureCard({ note, onNoteChange, onSaveNote, onKeepDraft }: Props) {
  const dateText = useMemo(() => dateFormatter.format(new Date()), []);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const focusTimeoutRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (focusTimeoutRef.current) {
        window.clearTimeout(focusTimeoutRef.current);
      }
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const openEditor = () => {
    setIsFlipped(true);
    focusTimeoutRef.current = window.setTimeout(() => textareaRef.current?.focus(), 380);
  };

  const closeEditor = () => {
    if (note.trim()) {
      onKeepDraft(note);
    }
    setIsFlipped(false);
  };

  const saveNote = () => {
    const trimmedNote = note.trim();
    if (!trimmedNote || showSaved) {
      return;
    }

    onSaveNote(trimmedNote);
    setShowSaved(true);
    resetTimeoutRef.current = window.setTimeout(() => {
      setIsFlipped(false);
      setShowSaved(false);
    }, 900);
  };

  const handleEditorKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Escape') {
      closeEditor();
      return;
    }

    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      saveNote();
    }
  };

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

      <div className={`${styles.scene} relative mx-auto min-h-0 w-full max-w-[440px] flex-1`}>
        <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
          <div
            className={`${styles.face} ${styles.front} voca-capture-frame flex min-h-0 flex-col overflow-hidden rounded-[30px] border border-[rgba(0,140,149,0.2)] p-6 backdrop-blur-sm`}
            aria-hidden={isFlipped}
          >
            <div className="voca-capture-content flex min-h-0 flex-1 flex-col items-center justify-center px-2 py-5 text-center">
              <div className="rounded-full border border-white/60 bg-[rgba(255,253,245,0.58)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0E6F74]">
                Today · {dateText}
              </div>
              <h2 className="voca-capture-title font-lingiDisplay mt-5 max-w-[320px] text-[24px] font-normal leading-[34px] text-[#243238]">
                What caught your
                <br />
                attention today?
              </h2>
              <img
                src="/lingi-parrot.png"
                alt=""
                aria-hidden="true"
                className="voca-capture-parrot pointer-events-none mt-5 h-[112px] w-[104px] shrink-0 object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.08)]"
              />

              <p className="voca-capture-copy mt-5 max-w-[310px] text-[15px] leading-[24px] text-[#61777B]">
                Keep a word, phrase, or sentence here and come back to it later.
              </p>

              <button
                type="button"
                onClick={openEditor}
                tabIndex={isFlipped ? -1 : 0}
                className="mt-6 inline-flex h-11 min-h-11 shrink-0 items-center gap-2 rounded-full bg-[#008C95] px-5 text-[14px] font-semibold leading-none text-white transition-colors active:bg-[#006F76] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95] focus-visible:ring-offset-2"
              >
                Start a note
                <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className={`${styles.face} ${styles.back} voca-capture-frame flex min-h-0 flex-col overflow-hidden rounded-[30px] border border-[rgba(0,140,149,0.2)] p-5 backdrop-blur-sm`}
            aria-hidden={!isFlipped}
          >
            <div className="grid grid-cols-[92px_1fr_92px] items-center">
              <button
                type="button"
                onClick={closeEditor}
                disabled={showSaved}
                tabIndex={isFlipped ? 0 : -1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#008C95] transition active:scale-[0.96] active:bg-white/50 disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95]"
                aria-label="Back to card front"
              >
                <ArrowLeft size={20} strokeWidth={2.2} aria-hidden="true" />
              </button>
              <p className="whitespace-nowrap text-center text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0E6F74]">
                Today · {dateText}
              </p>
              <button
                type="button"
                onClick={saveNote}
                disabled={!note.trim() || showSaved}
                tabIndex={isFlipped ? 0 : -1}
                className="justify-self-end inline-flex h-10 min-w-[88px] items-center justify-center rounded-full px-4 text-[13px] font-semibold text-white transition enabled:bg-[#008C95] enabled:active:scale-[0.98] enabled:active:bg-[#006F76] disabled:bg-[#B9C8C3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95] focus-visible:ring-offset-2"
              >
                Save note
              </button>
            </div>

            <div className="relative mt-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[22px] border border-white/70 bg-[rgba(255,253,245,0.72)]">
              <textarea
                ref={textareaRef}
                value={note}
                onChange={(event) => onNoteChange(event.target.value)}
                onKeyDown={handleEditorKeyDown}
                disabled={showSaved}
                tabIndex={isFlipped ? 0 : -1}
                placeholder="Type what you’d like to remember..."
                aria-label="New vocabulary note"
                className="min-h-0 w-full flex-1 resize-none bg-transparent px-5 pb-3 pt-5 text-[16px] leading-[26px] text-[#243238] outline-none placeholder:text-[#61777B]"
              />

              {showSaved ? (
                <div className={`${styles.savedOverlay} absolute inset-0 flex flex-col items-center justify-center bg-[rgba(255,253,245,0.94)]`} role="status">
                  <span className={styles.starBurst} aria-hidden="true">
                    <Star size={48} strokeWidth={1.8} fill="#F6CF69" />
                    <i className={styles.sparkOne}>✦</i>
                    <i className={styles.sparkTwo}>✦</i>
                    <i className={styles.sparkThree}>✦</i>
                  </span>
                  <span className="mt-3 text-[16px] font-semibold text-[#243238]">Note saved</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
