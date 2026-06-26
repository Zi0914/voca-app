import { useMemo, useState } from 'react';
import { Home } from './pages/Home';
import { Nest } from './pages/Nest';
import { Repeat } from './pages/Repeat';
import { Me } from './pages/Me';
import { AddNote } from './pages/AddNote';
import { GeneratedPreview } from './pages/GeneratedPreview';
import { NoteDetail } from './pages/NoteDetail';
import { Note, noteMockData, NoteType } from './data/notes';
import { BottomNav } from './components/BottomNav';
import './styles/global.css';

const pageMap = {
  home: 'home',
  nest: 'nest',
  repeat: 'repeat',
  me: 'me',
  add: 'add',
  preview: 'preview',
  detail: 'detail',
};

type PageKey = keyof typeof pageMap;

export default function App() {
  const [page, setPage] = useState<PageKey>('home');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [draftText, setDraftText] = useState('');
  const [notes, setNotes] = useState<Note[]>(noteMockData);

  const noteTypeCounts = useMemo(
    () => ({
      all: notes.length,
      word: notes.filter((note) => note.type === 'word').length,
      phrase: notes.filter((note) => note.type === 'phrase').length,
      sentence: notes.filter((note) => note.type === 'sentence').length,
    }),
    [notes],
  );

  const onSave = (note: Note) => {
    setNotes((current) => [note, ...current]);
    setDraftText('');
    setPage('nest');
  };

  const openPreview = () => setPage('preview');
  const openDetail = (note: Note) => {
    setSelectedNote(note);
    setPage('detail');
  };

  return (
    <div className="app-shell">
      {page === 'home' && (
        <Home
          notes={notes}
          draftText={draftText}
          setDraftText={setDraftText}
          onAdd={() => setPage('add')}
          onPreview={openPreview}
          onOpenNote={openDetail}
        />
      )}
      {page === 'nest' && (
        <Nest notes={notes} onOpenNote={openDetail} counts={noteTypeCounts} />
      )}
      {page === 'repeat' && (
        <Repeat notes={notes} onOpenNote={openDetail} />
      )}
      {page === 'me' && <Me />}
      {page === 'add' && (
        <AddNote
          draftText={draftText}
          setDraftText={setDraftText}
          onBack={() => setPage('home')}
          onPreview={openPreview}
        />
      )}
      {page === 'preview' && (
        <GeneratedPreview
          draftText={draftText}
          onBack={() => setPage('add')}
          onSave={() => {
            const noteType: NoteType = draftText.trim().split(' ').length <= 2 ? 'word' : 'sentence';
            const note: Note = {
              id: `${Date.now()}`,
              type: noteType,
              english: draftText || 'Example sentence',
              chinese: noteType === 'word' ? '示例词语' : '示例句子的自然翻译',
              explanation: noteType === 'word' ? '示例解释' : '示例用法说明',
              highlight: noteType === 'word' ? draftText : '示例表达',
              addedAt: new Date().toISOString(),
            };
            onSave(note);
          }}
        />
      )}
      {page === 'detail' && selectedNote && (
        <NoteDetail note={selectedNote} onBack={() => setPage('nest')} />
      )}
      <BottomNav
        active={page === 'home' ? 'home' : page === 'nest' ? 'nest' : page === 'repeat' ? 'repeat' : page === 'me' ? 'me' : null}
        onNavigate={(value) => setPage(value)}
      />
    </div>
  );
}
