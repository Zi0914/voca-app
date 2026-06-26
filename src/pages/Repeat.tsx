import { Note } from '../data/notes';
import { NoteCard } from '../components/NoteCard';

type RepeatProps = {
  notes: Note[];
  onOpenNote: (note: Note) => void;
};

export function Repeat({ notes, onOpenNote }: RepeatProps) {
  return (
    <main className="screen">
      <section className="page-header">
        <div>
          <p className="eyebrow">Repeat today</p>
          <h1>A few saved notes, one small step at a time.</h1>
        </div>
      </section>

      <section className="card repeat-note-card">
        <p className="tiny-label">Keep it gentle</p>
        <p className="repeat-copy">Choose one note to revisit and keep your English feeling familiar.</p>
      </section>

      <section className="card note-list-card">
        {notes.slice(0, 3).map((note) => (
          <NoteCard key={note.id} note={note} actionLabel="Repeat" onOpen={() => onOpenNote(note)} />
        ))}
      </section>
    </main>
  );
}
