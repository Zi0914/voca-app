"use client";

import { useEffect, useState } from 'react';

type Note = {
  id: string;
  text: string;
  addedAt: string;
};

export default function Library() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('lingi_notes');
    if (raw) {
      try {
        setNotes(JSON.parse(raw));
      } catch (e) {
        setNotes([]);
      }
    }
  }, []);

  const clearAll = () => {
    localStorage.removeItem('lingi_notes');
    setNotes([]);
  };

  return (
    <section className="flex flex-1 flex-col gap-4">
      <div className="mb-2 text-[18px] font-medium text-[#243238]">Library</div>
      {notes.length === 0 ? (
        <div className="rounded-[18px] bg-white/78 border border-white/72 p-5 text-[#61777B]">No saved notes yet.</div>
      ) : (
        <div className="space-y-3">
          {notes.map((n) => (
            <div key={n.id} className="rounded-[18px] bg-[#FFFDF5]/90 border p-4">
              <div className="text-[15px] text-[#243238]">{n.text}</div>
              <div className="mt-2 text-[12px] text-[#61777B]">{new Date(n.addedAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-auto">
        <button onClick={clearAll} className="w-full rounded-[12px] bg-[#008C95] text-white py-3">Clear Library</button>
      </div>
    </section>
  );
}
