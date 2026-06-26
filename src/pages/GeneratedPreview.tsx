import { ArrowLeft, BookmarkPlus } from 'lucide-react';

type GeneratedPreviewProps = {
  draftText: string;
  onBack: () => void;
  onSave: () => void;
};

export function GeneratedPreview({ draftText, onBack, onSave }: GeneratedPreviewProps) {
  const text = draftText.trim() || "I'm still working on it.";
  const noteType = text.split(' ').length <= 2 ? 'Word' : 'Sentence';
  const chinese = noteType === 'Word' ? '微风' : '我还在处理 / 我还在做这个。';
  const highlight = noteType === 'Word' ? 'a gentle wind = 轻柔的风' : 'still working on = 还在处理某事';

  return (
    <main className="screen">
      <div className="page-header small">
        <button className="icon-button" type="button" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="eyebrow">Generated note</p>
          <h1>Review before saving</h1>
        </div>
      </div>

      <section className="card preview-card">
        <p className="note-type">{noteType}</p>
        <p className="preview-english">{text}</p>
        <p className="preview-chinese">{chinese}</p>
        <div className="preview-highlight">
          <span>Key expression</span>
          <p>{highlight}</p>
        </div>
      </section>

      <button className="primary-button full-width" type="button" onClick={onSave}>
        <BookmarkPlus size={18} />
        Save note
      </button>
    </main>
  );
}
