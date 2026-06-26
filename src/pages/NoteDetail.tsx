import { ArrowLeft } from 'lucide-react';
import { Note } from '../data/notes';

type NoteDetailProps = {
  note: Note;
  onBack: () => void;
};

export function NoteDetail({ note, onBack }: NoteDetailProps) {
  return (
    <main className="screen">
      <div className="page-header small">
        <button className="icon-button" type="button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="eyebrow">Note detail</p>
          <h1>{note.type === 'word' ? 'Word note' : note.type === 'phrase' ? 'Phrase note' : 'Sentence note'}</h1>
        </div>
      </div>

      <section className="card note-detail-card">
        <p className="note-type">{note.type.charAt(0).toUpperCase() + note.type.slice(1)}</p>
        <p className="preview-english">{note.english}</p>
        <p className="preview-chinese">{note.chinese}</p>
        <div className="preview-highlight">
          <span>Key expression</span>
          <p>{note.highlight}</p>
        </div>
        <div className="detail-explanation">
          <p className="tiny-label">Explanation</p>
          <p>{note.explanation}</p>
        </div>
      </section>
    </main>
  );
}
