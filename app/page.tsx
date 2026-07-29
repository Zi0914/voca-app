"use client";

import { useEffect, useState } from 'react';
import HomeHeader from './components/home-header';
import HomeCaptureCard from './components/home-capture-card';
import BottomNav from './components/bottom-nav';
import Library, { type SavedNote } from './components/library';
import WritingPage from './components/writing-page';

type ActiveView = 'home' | 'library' | 'note';
type EditorMode = 'new' | 'draft' | 'saved';
const STORAGE_KEY = 'voca_notes';
const DRAFT_STORAGE_KEY = 'voca_draft';
const LEGACY_STORAGE_KEY = 'lingi_notes';
const DELETED_NOTE_IDS_KEY = 'voca_deleted_note_ids';
const REPLACED_MOCK_NOTE_IDS = new Set([
  'mock-2026-07-08-serendipity',
  'mock-2026-07-08-linger',
  'mock-2026-07-08-tender',
]);
const MOCK_SAVED_NOTES: SavedNote[] = [
  {
    id: 'mock-2026-07-06-serendipity',
    text: 'serendipity - finding something good by accident',
    savedAt: '2026-07-06T09:18:00.000-07:00',
  },
  {
    id: 'mock-2026-07-07-linger',
    text: 'linger - to stay a little longer than expected',
    savedAt: '2026-07-07T11:42:00.000-07:00',
  },
  {
    id: 'mock-2026-07-07-tender',
    text: 'tender - gentle, kind, or easy to hurt',
    savedAt: '2026-07-07T15:06:00.000-07:00',
  },
  {
    id: 'mock-2026-07-08-glimpse',
    text: 'glimpse - a quick look',
    savedAt: '2026-07-08T09:18:00.000-07:00',
  },
  {
    id: 'mock-2026-07-08-cherish',
    text: 'cherish - to keep something dear in your heart',
    savedAt: '2026-07-08T11:42:00.000-07:00',
  },
];

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
      const key = note.id;
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
  const [newNoteText, setNewNoteText] = useState('');
  const [editorMode, setEditorMode] = useState<EditorMode>('new');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState('');
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const [savedPopupMode, setSavedPopupMode] = useState<'saved' | 'updated'>('saved');

  useEffect(() => {
    try {
      const rawNotes = window.localStorage.getItem(STORAGE_KEY);
      const rawLegacyNotes = window.localStorage.getItem(LEGACY_STORAGE_KEY);
      const rawDraft = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      const rawDeletedNoteIds = window.localStorage.getItem(DELETED_NOTE_IDS_KEY);
      const deletedNoteIds = new Set<string>(
        rawDeletedNoteIds && Array.isArray(JSON.parse(rawDeletedNoteIds)) ? JSON.parse(rawDeletedNoteIds) : [],
      );
      const normalizedNotes = rawNotes
        ? normalizeSavedNotes(JSON.parse(rawNotes)).filter((note) => !REPLACED_MOCK_NOTE_IDS.has(note.id))
        : [];
      const normalizedLegacyNotes = rawLegacyNotes
        ? normalizeSavedNotes(JSON.parse(rawLegacyNotes)).filter((note) => !REPLACED_MOCK_NOTE_IDS.has(note.id))
        : [];
      const nextNotes = mergeSavedNotes(normalizedNotes, normalizedLegacyNotes, MOCK_SAVED_NOTES).filter(
        (note) => !deletedNoteIds.has(note.id),
      );

      if (nextNotes.length > 0) {
        setSavedNotes(nextNotes);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextNotes));
      }

      if (rawDraft) {
        setNote(rawDraft);
      }
    } catch {
      setSavedNotes([]);
    }
  }, []);

  useEffect(() => {
    try {
      if (note.trim()) {
        window.localStorage.setItem(DRAFT_STORAGE_KEY, note);
      } else {
        window.localStorage.removeItem(DRAFT_STORAGE_KEY);
      }
    } catch {
      // Local persistence is best-effort for this prototype.
    }
  }, [note]);

  useEffect(() => {
    if (!showSavedPopup) {
      return;
    }

    const timeout = window.setTimeout(() => setShowSavedPopup(false), 4200);
    return () => window.clearTimeout(timeout);
  }, [showSavedPopup]);

  const handleSaved = (text: string) => {
    if (editorMode === 'saved' && editingNoteId) {
      setSavedNotes((currentNotes) => {
        const nextNotes = currentNotes.map((savedNote) =>
          savedNote.id === editingNoteId ? { ...savedNote, text } : savedNote,
        );

        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextNotes));
        } catch {
          // Local persistence is best-effort for this prototype.
        }

        return nextNotes;
      });
      setEditingNoteId(null);
      setEditingNoteText('');
      setActive('library');
      setSavedPopupMode('updated');
      setShowSavedPopup(true);
      return;
    }

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
    if (editorMode === 'draft') {
      setNote('');
    } else {
      setNewNoteText('');
    }
    setEditorMode('new');
    setSavedPopupMode('saved');
    setShowSavedPopup(true);
  };

  const handleEditNote = (savedNote: SavedNote) => {
    setEditorMode('saved');
    setEditingNoteId(savedNote.id);
    setEditingNoteText(savedNote.text);
    setShowSavedPopup(false);
    setActive('note');
  };

  const handleStartNewNote = () => {
    setEditorMode('new');
    setEditingNoteId(null);
    setEditingNoteText('');
    setShowSavedPopup(false);
    setActive('note');
  };

  const handleContinueDraft = () => {
    setEditorMode('draft');
    setEditingNoteId(null);
    setEditingNoteText('');
    setShowSavedPopup(false);
    setActive('note');
  };

  const handleDiscardDraft = () => {
    setNote('');
    try {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // Local persistence is best-effort for this prototype.
    }
  };

  const handleEditorBack = () => {
    if (editorMode === 'saved') {
      setEditingNoteId(null);
      setEditingNoteText('');
      setActive('library');
      return;
    }

    if (editorMode === 'draft') {
      setActive('library');
      return;
    }

    if (newNoteText.trim() && !note.trim()) {
      setNote(newNoteText);
      setNewNoteText('');
    }
    setActive('home');
  };

  const handleDeleteNote = (id: string) => {
    setSavedNotes((currentNotes) => {
      const nextNotes = currentNotes.filter((note) => note.id !== id);

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextNotes));
        const rawDeletedNoteIds = window.localStorage.getItem(DELETED_NOTE_IDS_KEY);
        const deletedNoteIds = new Set<string>(
          rawDeletedNoteIds && Array.isArray(JSON.parse(rawDeletedNoteIds)) ? JSON.parse(rawDeletedNoteIds) : [],
        );
        deletedNoteIds.add(id);
        window.localStorage.setItem(DELETED_NOTE_IDS_KEY, JSON.stringify([...deletedNoteIds]));
      } catch {
        // Local persistence is best-effort for this prototype.
      }

      return nextNotes;
    });
  };

  if (active === 'note') {
    const editingNote =
      editorMode === 'saved' && editingNoteId
        ? savedNotes.find((savedNote) => savedNote.id === editingNoteId)
        : null;
    const editorText =
      editorMode === 'saved' ? editingNoteText : editorMode === 'draft' ? note : newNoteText;
    const handleEditorTextChange =
      editorMode === 'saved' ? setEditingNoteText : editorMode === 'draft' ? setNote : setNewNoteText;

    return (
      <main className="mx-auto min-h-screen w-full max-w-[480px] bg-transparent">
        <WritingPage
          note={editorText}
          mode={editorMode === 'saved' ? 'edit' : editorMode === 'draft' ? 'draft' : 'create'}
          noteDate={editingNote?.savedAt}
          onNoteChange={handleEditorTextChange}
          onBack={handleEditorBack}
          onSaved={handleSaved}
        />
      </main>
    );
  }

  return (
    <main
      className={`mx-auto flex h-[100dvh] min-h-0 w-full max-w-[480px] flex-col overflow-hidden bg-transparent px-3 pt-[max(1.25rem,env(safe-area-inset-top))] min-[400px]:px-4 ${
        active === 'home'
          ? 'pb-[calc(144px_+_env(safe-area-inset-bottom))]'
          : 'pb-0'
      }`}
    >
      {active === 'home' ? (
        <>
          <HomeHeader />
          <HomeCaptureCard onOpenNote={handleStartNewNote} />
        </>
      ) : (
        <Library
          notes={savedNotes}
          draftText={note}
          onStartNote={handleStartNewNote}
          onContinueDraft={handleContinueDraft}
          onDiscardDraft={handleDiscardDraft}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />
      )}
      {showSavedPopup ? (
        <div className="fixed bottom-[calc(112px_+_env(safe-area-inset-bottom))] left-0 right-0 z-30 mx-auto flex w-full max-w-[480px] justify-center px-3 min-[400px]:px-4">
          <div className="lingi-saved-popup w-full max-w-[432px]">
            <p className="text-left text-[15px] font-medium text-[#243238]">
              {savedPopupMode === 'updated' ? 'Note updated' : 'Saved to Library'}
            </p>
            <p className="mt-1 text-left text-[13px] leading-[18px] text-[#61777B]">
              {savedPopupMode === 'updated'
                ? 'Your changes have been saved.'
                : 'You can find it in Library anytime.'}
            </p>
          </div>
        </div>
      ) : null}
      <BottomNav active={active} onChange={(v) => setActive(v)} />
    </main>
  );
}
