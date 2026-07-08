"use client";

import { useEffect, useState } from 'react';
import HomeHeader from './components/home-header';
import HomeCaptureCard from './components/home-capture-card';
import BottomNav from './components/bottom-nav';
import Library, { type SavedNote } from './components/library';
import WritingPage from './components/writing-page';

type ActiveView = 'home' | 'library' | 'note';
const STORAGE_KEY = 'voca_notes';
const LEGACY_STORAGE_KEY = 'lingi_notes';

function normalizeSavedNotes(value: unknown): SavedNote[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }

      const note = item as { id?: unknown; text?: unknown; savedAt?: unknown; addedAt?: unknown };
      if (typeof note.text !== 'string') {
        return null;
      }

      return {
        id: typeof note.id === 'string' ? note.id : `${Date.now()}-${Math.random()}`,
        text: note.text,
        savedAt:
          typeof note.savedAt === 'string'
            ? note.savedAt
            : typeof note.addedAt === 'string'
              ? note.addedAt
              : new Date().toISOString(),
      };
    })
    .filter((item): item is SavedNote => Boolean(item));
}

function mergeSavedNotes(...noteLists: SavedNote[][]) {
  const seen = new Set<string>();
  return noteLists
    .flat()
    .filter((note) => {
      const key = `${note.id}-${note.savedAt}-${note.text}`;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
}

export default function HomePage() {
  const [active, setActive] = useState<ActiveView>('home');
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [showSavedPopup, setShowSavedPopup] = useState(false);

  useEffect(() => {
    try {
      const rawNotes = window.localStorage.getItem(STORAGE_KEY);
      const rawLegacyNotes = window.localStorage.getItem(LEGACY_STORAGE_KEY);
      const normalizedNotes = rawNotes ? normalizeSavedNotes(JSON.parse(rawNotes)) : [];
      const normalizedLegacyNotes = rawLegacyNotes ? normalizeSavedNotes(JSON.parse(rawLegacyNotes)) : [];
      const nextNotes = mergeSavedNotes(normalizedNotes, normalizedLegacyNotes);

      if (nextNotes.length > 0) {
        setSavedNotes(nextNotes);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextNotes));
      }
    } catch {
      setSavedNotes([]);
    }
  }, []);

  useEffect(() => {
    if (!showSavedPopup) {
      return;
    }

    const timeout = window.setTimeout(() => setShowSavedPopup(false), 4200);
    return () => window.clearTimeout(timeout);
  }, [showSavedPopup]);

  const handleSaved = (text: string) => {
    const savedNote = {
      id: `${Date.now()}`,
      text,
      savedAt: new Date().toISOString(),
    };

    setSavedNotes((currentNotes) => {
      const nextNotes = [savedNote, ...currentNotes];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextNotes));
      } catch {
        // Local persistence is best-effort for this prototype.
      }
      return nextNotes;
    });
    setActive('home');
    setNote('');
    setShowSavedPopup(true);
  };

  if (active === 'note') {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[480px] bg-transparent">
        <WritingPage
          note={note}
          onNoteChange={setNote}
          onBack={() => setActive('home')}
          onSaved={handleSaved}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-transparent px-5 pb-[calc(104px_+_env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] min-[400px]:px-6">
      <HomeHeader />
      {active === 'home' ? (
        <HomeCaptureCard note={note} onOpenNote={() => setActive('note')} />
      ) : (
        <Library notes={savedNotes} />
      )}
      {showSavedPopup ? (
        <div className="fixed bottom-[calc(112px_+_env(safe-area-inset-bottom))] left-0 right-0 z-30 mx-auto flex w-full max-w-[480px] justify-center px-5 min-[400px]:px-6">
          <div className="lingi-saved-popup w-full max-w-[432px]">
            <p className="text-left text-[15px] font-medium text-[#243238]">Saved to Library</p>
            <p className="mt-1 text-left text-[13px] leading-[18px] text-[#61777B]">You can find it in Library anytime.</p>
          </div>
        </div>
      ) : null}
      <BottomNav active={active} onChange={(v) => setActive(v)} />
    </main>
  );
}
