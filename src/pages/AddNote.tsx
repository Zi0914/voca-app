import { ArrowLeft, Mic2, Camera, MessageSquare } from 'lucide-react';

type AddNoteProps = {
  draftText: string;
  setDraftText: (value: string) => void;
  onBack: () => void;
  onPreview: () => void;
};

export function AddNote({ draftText, setDraftText, onBack, onPreview }: AddNoteProps) {
  return (
    <main className="screen">
      <div className="page-header small">
        <button className="icon-button" type="button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="eyebrow">Add note</p>
          <h1>Write or paste English</h1>
        </div>
      </div>

      <section className="card input-card">
        <label className="input-label" htmlFor="english-input">
          English text
        </label>
        <textarea
          id="english-input"
          value={draftText}
          onChange={(event) => setDraftText(event.target.value)}
          placeholder="Type something like “I’ll send it before EOD.”"
          rows={5}
          className="text-area"
        />
      </section>

      <section className="card secondary-actions-card">
        <p className="tiny-label">Secondary options</p>
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
      </section>

      <button className="primary-button full-width" type="button" onClick={onPreview}>
        See generated note
      </button>
    </main>
  );
}
