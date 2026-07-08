"use client";

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Search } from 'lucide-react';

export type SavedNote = {
  id: string;
  text: string;
  savedAt: string;
};

type Props = {
  notes: SavedNote[];
};

const calendarTitleFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' });
const shortDateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

const weekdayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function startOfDay(date: Date) {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

function startOfWeek(date: Date) {
  const weekStart = startOfDay(date);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  return weekStart;
}

function sameDay(a: Date, b: Date) {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function getVisibleWeek(selectedDate: Date) {
  const weekStart = startOfWeek(selectedDate);
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
}

function getNoteCountForDate(notes: SavedNote[], date: Date) {
  return notes.filter((note) => sameDay(new Date(note.savedAt), date)).length;
}

function getCountLabel(count: number) {
  if (count === 0) {
    return '';
  }

  if (count === 1) {
    return '•';
  }

  return count > 9 ? '9+' : `${count}`;
}

function getCalendarTitle(date: Date) {
  const dateText = calendarTitleFormatter.format(date);
  return sameDay(date, new Date()) ? `Today, ${dateText}` : dateText;
}

export default function Library({ notes }: Props) {
  const [query, setQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  useEffect(() => {
    if (notes.length === 0 || getNoteCountForDate(notes, selectedDate) > 0) {
      return;
    }

    const latestNote = notes.reduce((latest, note) => {
      return new Date(note.savedAt).getTime() > new Date(latest.savedAt).getTime() ? note : latest;
    }, notes[0]);

    setSelectedDate(new Date(latestNote.savedAt));
  }, [notes, selectedDate]);

  const visibleWeek = useMemo(() => getVisibleWeek(selectedDate), [selectedDate]);
  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return notes
      .filter((note) => {
        const noteDate = new Date(note.savedAt);
        return sameDay(noteDate, selectedDate);
      })
      .filter((note) => note.text.toLowerCase().includes(normalizedQuery))
      .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
  }, [notes, query, selectedDate]);

  const goToPreviousPeriod = () => {
    setSelectedDate((currentDate) => addDays(currentDate, -7));
  };

  const goToNextPeriod = () => {
    setSelectedDate((currentDate) => addDays(currentDate, 7));
  };

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <label className="mb-4 flex h-12 items-center gap-3 rounded-[24px] border border-[#E1E6E3] bg-white px-4">
        <Search size={18} className="shrink-0 text-[#008C95]" strokeWidth={2.2} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search notes"
          className="min-w-0 flex-1 bg-transparent text-[14px] leading-none text-[#243238] outline-none placeholder:text-[#61777B]"
        />
      </label>

      <div className="mb-5 border-b border-[rgba(97,119,123,0.12)] pb-4">
        <div className="grid grid-cols-[1fr_40px] items-start gap-2">
          <div className="min-w-0">
            <p className="font-lingiText truncate text-[14px] font-normal leading-none text-[#243238]">{getCalendarTitle(selectedDate)}</p>
          </div>

          <div className="flex justify-end">
            <div className="flex h-9 w-9 items-center justify-center rounded-[13px] border border-[rgba(0,140,149,0.20)] bg-[rgba(255,253,245,0.72)] text-[#008C95] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
              <CalendarDays size={17} strokeWidth={2.25} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[24px_1fr_24px] items-center gap-1">
          <button
            type="button"
            onClick={goToPreviousPeriod}
            className="flex h-8 w-6 items-center justify-center text-[#61777B]"
            aria-label="Previous period"
          >
            <ChevronLeft size={22} strokeWidth={2.4} />
          </button>

          <div className="grid grid-cols-7 gap-1">
            {visibleWeek.map((date, index) => {
              const isSelected = sameDay(date, selectedDate);
              const isToday = sameDay(date, new Date());
              const isFilled = isSelected && !isToday;
              const noteCount = getNoteCountForDate(notes, date);
              const countLabel = getCountLabel(noteCount);

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`mx-auto flex h-[72px] w-[54px] flex-col items-center justify-center gap-2 rounded-[18px] border transition-colors ${
                    isFilled
                      ? 'border-[#008C95] bg-[#008C95] text-white shadow-[0_10px_22px_rgba(0,140,149,0.20)]'
                      : isToday
                        ? 'border-[#D7DEDA] bg-white/24 text-[#243238]'
                        : 'border-transparent bg-transparent text-[#61777B]'
                  }`}
                >
                  <span className={`text-[16px] font-medium leading-none ${isFilled ? 'text-white' : ''}`}>
                    {weekdayLetters[index]}
                  </span>
                  <span className={`text-[19px] font-extrabold leading-none ${isFilled ? 'text-white' : isToday ? 'text-[#243238]' : 'text-[#9AA9A7]'}`}>
                    {date.getDate()}
                  </span>
                  <span
                    className={`flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none ${
                      noteCount === 0
                        ? 'bg-transparent text-transparent'
                        : isFilled
                          ? 'bg-white/92 text-[#008C95]'
                          : 'bg-[rgba(246,207,105,0.48)] text-[#0E6F74]'
                    }`}
                  >
                    {countLabel}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goToNextPeriod}
            className="flex h-8 w-6 items-center justify-center text-[#61777B]"
            aria-label="Next period"
          >
            <ChevronRight size={22} strokeWidth={2.4} />
          </button>
        </div>
      </div>

      <div className="mb-3 flex items-end justify-between gap-4">
        <p className="font-lingiGreeting text-[22px] font-semibold leading-none text-[#243238]">Save the cards</p>
        <p className="font-lingiText shrink-0 text-right text-[14px] font-normal leading-none text-[#61777B]">{filteredNotes.length} card</p>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-3">
        {filteredNotes.length === 0 ? (
          <div className="rounded-[22px] border border-[rgba(255,255,255,0.72)] bg-[rgba(255,253,245,0.74)] px-5 py-6 text-[14px] leading-[22px] text-[#61777B]">
            {notes.length === 0 ? 'Saved cards will appear here after you catch a note.' : 'No saved cards match this calendar view.'}
          </div>
        ) : (
          filteredNotes.map((note) => {
            const savedDate = new Date(note.savedAt);

            return (
              <article
                key={note.id}
                className="rounded-[24px] border border-[rgba(255,255,255,0.72)] bg-[rgba(255,253,245,0.82)] p-4 shadow-[0_18px_42px_rgba(64,93,91,0.10)] backdrop-blur-sm"
              >
                <div className="mb-3 inline-flex rounded-full bg-[rgba(221,239,233,0.82)] px-3 py-1 text-[12px] font-medium text-[#0E6F74]">
                  {shortDateFormatter.format(savedDate)} · {timeFormatter.format(savedDate)}
                </div>
                <p className="whitespace-pre-wrap text-[15px] leading-[24px] text-[#243238]">{note.text}</p>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
