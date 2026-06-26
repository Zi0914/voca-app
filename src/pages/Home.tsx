import { Note } from '../data/notes';
import { ChevronRight, Mic2, Camera, MessageSquare, Plus } from 'lucide-react';
import { NoteCard } from '../components/NoteCard';

type HomeProps = {
  notes: Note[];
  draftText: string;
  setDraftText: (value: string) => void;
  onAdd: () => void;
  onPreview: () => void;
  onOpenNote: (note: Note) => void;
};

export function Home({ notes, draftText, setDraftText, onAdd, onPreview, onOpenNote }: HomeProps) {
  return (
    <main className="screen">
      <section className="page-header">
        <div>
          <p className="eyebrow">Good morning</p>
          <h1>Pluma</h1>
        </div>
        <button className="header-add-button" type="button" onClick={onAdd}>
          <span className="header-add-icon">
            <Plus size={16} />
          </span>
          Add
        </button>
      </section>

      <section className="starter-card card">
        <div>
          <p className="tiny-label">Start with one thing</p>
          <h2>An English note you can carry with you.</h2>
          <p className="card-copy">
            It can be something you just read, heard, or wanted to say.
          </p>
          <p className="example">Example: “I’m still working on it.”</p>
        </div>
        <button className="primary-button" type="button" onClick={onAdd}>
          Add your first note
        </button>
      </section>

      <section className="card quick-add-card">
        <div className="quick-add-top">
          <div>
            <p className="tiny-label">Quick add</p>
            <p className="input-label">Type or paste English text</p>
          </div>
          <ChevronRight size={20} />
        </div>
        <textarea
          value={draftText}
          onChange={(event) => setDraftText(event.target.value)}
          placeholder="Type or paste something here"
          className="text-area"
          rows={3}
        />
        <div className="quick-add-actions">
          <button type="button" className="secondary-chip">
            <Mic2 size={16} />
            Speak
          </button>
          <button type="button" className="secondary-chip">
            <Camera size={16} />
            Photo
          </button>
          <button type="button" className="secondary-chip">
            <MessageSquare size={16} />
            Ask AI
          </button>
        </div>
        <button className="secondary-button" type="button" onClick={onPreview}>
          Preview generated note
        </button>
      </section>

      <section className="card section-card">
        <div className="section-title-row">
          <div>
            <p className="tiny-label">Repeat today</p>
            <h2>One small step, one simple note.</h2>
          </div>
        </div>
        <div className="mini-note-grid">
          {notes.slice(0, 2).map((note) => (
            <NoteCard key={note.id} note={note} onOpen={() => onOpenNote(note)} />
          ))}
        </div>
      </section>

      <section className="card section-card">
        <div className="section-title-row">
          <div>
            <p className="tiny-label">Recent notes</p>
            <h2>Your latest items in Nest.</h2>
          </div>
        </div>
        <div className="mini-note-grid">
          {notes.slice(0, 2).map((note) => (
            <NoteCard key={note.id} note={note} onOpen={() => onOpenNote(note)} />
          ))}
        </div>
      </section>
    </main>
  );
}
