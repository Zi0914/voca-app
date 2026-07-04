"use client";

import { useEffect, useState } from 'react';
import HomeHeader from './components/home-header';
import HomeCaptureCard from './components/home-capture-card';
import BottomNav from './components/bottom-nav';
import Library from './components/library';
import WritingPage from './components/writing-page';
import { X } from 'lucide-react';

type ActiveView = 'home' | 'library' | 'note';

export default function HomePage() {
  const [active, setActive] = useState<ActiveView>('home');
  const [note, setNote] = useState('');
  const [showSavedPopup, setShowSavedPopup] = useState(false);

  useEffect(() => {
    if (!showSavedPopup) {
      return;
    }

    const timeout = window.setTimeout(() => setShowSavedPopup(false), 4200);
    return () => window.clearTimeout(timeout);
  }, [showSavedPopup]);

  if (active === 'note') {
    return (
      <main className="mx-auto min-h-screen w-full max-w-[480px] bg-transparent">
        <WritingPage
          note={note}
          onNoteChange={setNote}
          onBack={() => setActive('home')}
          onSaved={() => {
            setActive('home');
            setShowSavedPopup(true);
          }}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-transparent px-5 pb-[calc(128px+env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] min-[400px]:px-6">
      <HomeHeader />
      {active === 'home' ? <HomeCaptureCard note={note} onOpenNote={() => setActive('note')} /> : <Library />}
      {showSavedPopup ? (
        <div className="fixed bottom-[calc(124px+env(safe-area-inset-bottom))] left-0 right-0 z-30 mx-auto flex w-full max-w-[480px] justify-center px-5 min-[400px]:px-6">
          <div className="lingi-saved-popup relative w-full max-w-[432px]">
            <button
              type="button"
              onClick={() => setShowSavedPopup(false)}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-[#61777B] transition-colors hover:bg-[#DDEFE9]/70 hover:text-[#243238]"
              aria-label="Dismiss saved notification"
            >
              <X size={16} />
            </button>
            <p className="pr-8 text-left text-[15px] font-medium text-[#243238]">Saved to Library</p>
            <p className="mt-1 pr-8 text-left text-[13px] text-[#61777B]">You can find it in Library anytime.</p>
          </div>
        </div>
      ) : null}
      <BottomNav active={active} onChange={(v) => setActive(v)} />
    </main>
  );
}
