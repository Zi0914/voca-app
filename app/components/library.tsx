"use client";

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

export type SavedNote = {
  id: string;
  text: string;
  savedAt: string;
};

type Props = {
  notes: SavedNote[];
  onDeleteNote: (id: string) => void;
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

  return count > 9 ? '9+' : `${count}`;
}

function getDayDifference(date: Date, referenceDate = new Date()) {
  const day = startOfDay(date).getTime();
  const referenceDay = startOfDay(referenceDate).getTime();
  return Math.round((day - referenceDay) / 86400000);
}

function getCalendarTitle(date: Date) {
  const dateText = calendarTitleFormatter.format(date);
  const dayDifference = getDayDifference(date);

  if (dayDifference === 0) {
    return `Today, ${dateText}`;
  }

  if (dayDifference === -1) {
    return `Yesterday, ${dateText}`;
  }

  return dateText;
}

function getSavedCountTitle(count: number) {
  return `Saved ${count} ${count === 1 ? 'card' : 'cards'}`;
}

function getEmptyStateMessage(date: Date) {
  return getDayDifference(date) > 0
    ? 'This day is still ahead. Come back later to save new cards.'
    : 'No cards saved for this date yet. A fresh day to start capturing new words.';
}

export default function Library({ notes, onDeleteNote }: Props) {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [hasAutoSelectedDate, setHasAutoSelectedDate] = useState(false);

  useEffect(() => {
    if (hasAutoSelectedDate || notes.length === 0 || getNoteCountForDate(notes, selectedDate) > 0) {
      return;
    }

    const latestNote = notes.reduce((latest, note) => {
      return new Date(note.savedAt).getTime() > new Date(latest.savedAt).getTime() ? note : latest;
    }, notes[0]);

    setSelectedDate(new Date(latestNote.savedAt));
    setHasAutoSelectedDate(true);
  }, [hasAutoSelectedDate, notes, selectedDate]);

  const visibleWeek = useMemo(() => getVisibleWeek(selectedDate), [selectedDate]);
  const selectedDateNoteCount = useMemo(() => getNoteCountForDate(notes, selectedDate), [notes, selectedDate]);
  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        const noteDate = new Date(note.savedAt);
        return sameDay(noteDate, selectedDate);
      })
      .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
  }, [notes, selectedDate]);

  const goToPreviousPeriod = () => {
    setSelectedDate((currentDate) => addDays(currentDate, -7));
  };

  const goToNextPeriod = () => {
    setSelectedDate((currentDate) => addDays(currentDate, 7));
  };

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="mb-5 border-b border-[rgba(97,119,123,0.12)] pb-4">
        <p className="font-lingiText truncate text-center text-[14px] font-normal leading-none text-[#243238]">{getCalendarTitle(selectedDate)}</p>

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
              const noteCount = getNoteCountForDate(notes, date);
              const countLabel = getCountLabel(noteCount);
              const hasCards = noteCount > 0;
              const isFutureDate = getDayDifference(date) > 0;
              const dateNumberColor = hasCards
                ? 'text-[#111111]'
                : isFutureDate
                  ? 'text-[#7E8F8C]'
                  : 'text-[#A8B3B1]';
              const weekdayColor = isSelected ? 'text-white/88' : 'text-[#61777B]';
              const selectedTextColor = isSelected ? 'text-white' : dateNumberColor;
              const countColor = isSelected ? 'text-white' : 'text-[#111111]';

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => {
                    setHasAutoSelectedDate(true);
                    setSelectedDate(date);
                  }}
                  className={`mx-auto flex h-[72px] w-[54px] flex-col items-center justify-center gap-2 rounded-[18px] border transition-colors ${
                    isSelected ? 'border-[#008C95] bg-[#008C95]' : 'border-transparent bg-transparent'
                  }`}
                >
                  <span className={`text-[16px] font-medium leading-none ${weekdayColor}`}>
                    {weekdayLetters[index]}
                  </span>
                  <span className={`font-lingiText text-[13px] font-normal leading-none ${selectedTextColor}`}>
                    {date.getDate()}
                  </span>
                  <span className={`font-lingiText flex h-[17px] min-w-[17px] items-center justify-center px-1 text-[11px] font-normal leading-none ${countColor}`}>
                    {hasCards ? countLabel : ''}
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

      <div className="mb-3">
        <p className="font-lingiGreeting text-left text-[16px] font-light leading-none text-[#243238]">{getSavedCountTitle(selectedDateNoteCount)}</p>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-3">
        {filteredNotes.length === 0 ? (
          <div className="rounded-[22px] border border-[rgba(255,255,255,0.72)] bg-[rgba(255,253,245,0.74)] px-5 py-6 text-[14px] leading-[22px] text-[#61777B]">
            {getEmptyStateMessage(selectedDate)}
          </div>
        ) : (
          filteredNotes.map((note) => {
            const savedDate = new Date(note.savedAt);

            return (
              <article
                key={note.id}
                className="rounded-[18px] border border-[rgba(255,255,255,0.72)] bg-[rgba(255,253,245,0.78)] p-3 backdrop-blur-sm"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="inline-flex rounded-full bg-[rgba(221,239,233,0.82)] px-2.5 py-1 text-[11px] font-medium leading-none text-[#0E6F74]">
                    {shortDateFormatter.format(savedDate)} · {timeFormatter.format(savedDate)}
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteNote(note.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#8A7771] transition-colors hover:bg-[rgba(178,91,73,0.1)] hover:text-[#A64F3F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95] focus-visible:ring-offset-2"
                    aria-label={`Delete card: ${note.text}`}
                  >
                    <Trash2 size={17} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
                <p className="line-clamp-2 whitespace-pre-wrap text-[14px] leading-[20px] text-[#243238]">{note.text}</p>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
