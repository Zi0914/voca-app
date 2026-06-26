import { Note } from '../data/notes';

type NoteCardProps = {
  note: Note;
  onOpen: () => void;
  actionLabel?: string;
};

export function NoteCard({ note, onOpen, actionLabel }: NoteCardProps) {
  return (
    <button className="note-card" type="button" onClick={onOpen}>
      <div className="note-card-top">
        <span className="note-chip">{note.type}</span>
        {actionLabel ? <span className="note-action">{actionLabel}</span> : null}
      </div>
      <p className="note-english">{note.english}</p>
      <p className="note-chinese">{note.chinese}</p>
      <p className="note-highlight">{note.highlight}</p>
    </button>
  );
}
