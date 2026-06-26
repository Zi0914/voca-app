import { useMemo, useState } from 'react';
import { Note, NoteType } from '../data/notes';
import { NoteCard } from '../components/NoteCard';

const tabs = ['all', 'word', 'phrase', 'sentence'] as const;

type NestProps = {
  notes: Note[];
  counts: { all: number; word: number; phrase: number; sentence: number };
  onOpenNote: (note: Note) => void;
};

export function Nest({ notes, counts, onOpenNote }: NestProps) {
  const [filter, setFilter] = useState<'all' | NoteType>('all');

  const filteredNotes = useMemo(
    () => (filter === 'all' ? notes : notes.filter((note) => note.type === filter)),
    [filter, notes],
  );

  return (
    <main className="screen">
      <section className="page-header">
        <div>
          <p className="eyebrow">My Nest</p>
          <h1>Your saved words, phrases, and sentences.</h1>
        </div>
      </section>

      <section className="card filter-card">
        <div className="filter-row">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`filter-chip ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span>{counts[tab]}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card note-list-card">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <p className="tiny-label">No notes yet</p>
            <h2>Save a note to see it in Nest.</h2>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} onOpen={() => onOpenNote(note)} />
          ))
        )}
      </section>
    </main>
  );
}
