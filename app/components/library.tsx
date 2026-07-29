"use client";

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
  X,
} from 'lucide-react';

export type SavedNote = {
  id: string;
  text: string;
  savedAt: string;
};

type Props = {
  notes: SavedNote[];
  draftText: string;
  onStartNote: () => void;
  onContinueDraft: () => void;
  onDiscardDraft: () => void;
  onEditNote: (note: SavedNote) => void;
  onDeleteNote: (id: string) => void;
};

type LibraryFilter = 'all' | 'week' | 'date';

const longDateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' });
const monthTitleFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
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

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function sameDay(a: Date, b: Date) {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

function getDayDifference(date: Date, referenceDate = new Date()) {
  return Math.round((startOfDay(date).getTime() - startOfDay(referenceDate).getTime()) / 86400000);
}

function getGroupTitle(date: Date) {
  const difference = getDayDifference(date);

  if (difference === 0) {
    return 'Today';
  }

  if (difference === -1) {
    return 'Yesterday';
  }

  return longDateFormatter.format(date);
}

function getVisibleMonthDays(month: Date) {
  const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
  const gridStart = startOfWeek(monthStart);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

function getNoteCountForDate(notes: SavedNote[], date: Date) {
  return notes.filter((note) => sameDay(new Date(note.savedAt), date)).length;
}

export default function Library({
  notes,
  draftText,
  onStartNote,
  onContinueDraft,
  onDiscardDraft,
  onEditNote,
  onDeleteNote,
}: Props) {
  const [filter, setFilter] = useState<LibraryFilter>('all');
  const [query, setQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    if (notes.length === 0) {
      return new Date();
    }

    const latestNote = [...notes].sort(
      (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime(),
    )[0];
    return new Date(latestNote.savedAt);
  });
  const [calendarMonth, setCalendarMonth] = useState(() => selectedDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isDraftMenuOpen, setIsDraftMenuOpen] = useState(false);

  useEffect(() => {
    if (!openMenuId && !isDraftMenuOpen) {
      return;
    }

    const closeMenusOutside = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Element && target.closest('[data-library-menu]')) {
        return;
      }

      setOpenMenuId(null);
      setIsDraftMenuOpen(false);
    };

    document.addEventListener('pointerdown', closeMenusOutside);
    return () => document.removeEventListener('pointerdown', closeMenusOutside);
  }, [openMenuId, isDraftMenuOpen]);

  const visibleMonthDays = useMemo(() => getVisibleMonthDays(calendarMonth), [calendarMonth]);
  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const currentWeekStart = startOfWeek(new Date());
    const currentWeekEnd = addDays(currentWeekStart, 7);

    return notes
      .filter((note) => {
        const savedDate = new Date(note.savedAt);
        const matchesFilter =
          filter === 'all'
            ? true
            : filter === 'week'
              ? savedDate >= currentWeekStart && savedDate < currentWeekEnd
              : sameDay(savedDate, selectedDate);
        const matchesSearch = !normalizedQuery || note.text.toLocaleLowerCase().includes(normalizedQuery);
        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
  }, [filter, notes, query, selectedDate]);

  const groupedNotes = useMemo(() => {
    const groups: Array<{ key: string; date: Date; notes: SavedNote[] }> = [];

    filteredNotes.forEach((note) => {
      const savedDate = new Date(note.savedAt);
      const key = startOfDay(savedDate).toISOString();
      const latestGroup = groups[groups.length - 1];

      if (!latestGroup || latestGroup.key !== key) {
        groups.push({ key, date: savedDate, notes: [note] });
      } else {
        latestGroup.notes.push(note);
      }
    });

    return groups;
  }, [filteredNotes]);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const hasDraft = Boolean(draftText.trim());
  const showDraft =
    hasDraft &&
    filter !== 'date' &&
    (!normalizedQuery || draftText.toLocaleLowerCase().includes(normalizedQuery));
  const isPastDateFilter = filter === 'date' && getDayDifference(selectedDate) < 0;

  const emptyState = query.trim()
    ? {
        title: 'No matching notes yet.',
        detail: 'Try another word or phrase—you may find what you’re looking for.',
      }
    : filter === 'week'
      ? {
          title: 'Nothing saved this week—yet.',
          detail: 'A fresh week brings more chances to notice something worth keeping.',
        }
      : filter === 'date'
        ? {
            title: `Nothing saved on ${longDateFormatter.format(selectedDate)}—yet.`,
            detail: 'That’s okay. You can add a note whenever something catches your attention.',
          }
        : {
            title: 'Your Library is ready.',
            detail: 'Start with any word, phrase, or sentence you’d like to keep.',
          };

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0">
        <h1 className="font-lingiDisplay text-[22px] font-medium leading-none text-[#243238]">Library</h1>

        <label className="group mt-6 flex h-11 items-center gap-3 rounded-full border border-[rgba(0,140,149,0.12)] bg-[#F2F5F4] px-4 transition-colors duration-150 focus-within:border-[#008C95] focus-within:bg-[#FEFEFE]">
          <Search
            size={17}
            strokeWidth={2}
            className="shrink-0 text-[#61777B] transition-colors duration-150 group-focus-within:text-[#008C95]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search saved notes..."
            aria-label="Search saved notes"
            className="min-w-0 flex-1 bg-transparent text-[16px] text-[#243238] outline-none placeholder:text-[#7B8E8B]"
          />
        </label>

        <div className="mt-8 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setFilter('all');
                setIsCalendarOpen(false);
              }}
              className={`inline-flex h-9 items-center justify-center rounded-full px-4 text-[13px] font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95] focus-visible:ring-offset-2 ${
                filter === 'all'
                  ? 'border border-[rgba(0,140,149,0.42)] bg-[#E4EEF1] text-[#0E6F74]'
                  : 'border border-[rgba(0,140,149,0.42)] bg-transparent text-[#61777B]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => {
                setFilter('week');
                setIsCalendarOpen(false);
              }}
              className={`inline-flex h-9 items-center justify-center rounded-full px-4 text-[13px] font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95] focus-visible:ring-offset-2 ${
                filter === 'week'
                  ? 'border border-[rgba(0,140,149,0.42)] bg-[#E4EEF1] text-[#0E6F74]'
                  : 'border border-[rgba(0,140,149,0.42)] bg-transparent text-[#61777B]'
              }`}
            >
              This week
            </button>
            <button
              type="button"
              onClick={() => {
                setCalendarMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
                setIsCalendarOpen(true);
              }}
              className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-4 text-[13px] font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95] focus-visible:ring-offset-2 ${
                filter === 'date'
                  ? 'border border-[rgba(0,140,149,0.42)] bg-[#E4EEF1] text-[#0E6F74]'
                  : 'border border-[rgba(0,140,149,0.42)] bg-transparent text-[#61777B]'
              }`}
            >
              <CalendarDays size={16} strokeWidth={2} aria-hidden="true" />
              Date
            </button>
          </div>
          <p className="flex shrink-0 items-center gap-1 text-[12px] text-[#61777B]">
            <span>
              {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
            </span>
            {showDraft ? (
              <>
                <span aria-hidden="true">·</span>
                <span>1 draft</span>
              </>
            ) : null}
          </p>
        </div>

        {isCalendarOpen ? (
          <div className="fixed inset-0 z-40 mx-auto w-full max-w-[480px]">
            <button
              type="button"
              onClick={() => setIsCalendarOpen(false)}
              className="absolute inset-0 h-full w-full bg-[rgba(36,50,56,0.16)]"
              aria-label="Close calendar"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Choose a date"
              className="absolute inset-x-0 bottom-0 rounded-t-[28px] border-t border-[rgba(0,140,149,0.16)] bg-[#FEFEFE] px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_46px_rgba(64,93,91,0.14)] min-[400px]:px-4"
            >
              <div className="mx-auto h-1 w-10 rounded-full bg-[#CAD8D5]" aria-hidden="true" />
              <div className="mt-3 flex h-10 items-center justify-between">
                <p className="text-[17px] font-semibold text-[#243238]">Choose a date</p>
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#61777B] active:bg-[#F2F5F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95]"
                  aria-label="Close calendar"
                >
                  <X size={19} strokeWidth={2.1} />
                </button>
              </div>

              <div className="mt-2 grid grid-cols-[40px_1fr_40px] items-center">
              <button
                type="button"
                onClick={() => setCalendarMonth((currentMonth) => addMonths(currentMonth, -1))}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#008C95] active:bg-[#EAF7F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95]"
                aria-label="Previous month"
              >
                <ChevronLeft size={20} strokeWidth={2.2} />
              </button>

              <p className="text-center text-[15px] font-semibold leading-none text-[#243238]">
                {monthTitleFormatter.format(calendarMonth)}
              </p>

              <button
                type="button"
                onClick={() => setCalendarMonth((currentMonth) => addMonths(currentMonth, 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#008C95] active:bg-[#EAF7F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95]"
                aria-label="Next month"
              >
                <ChevronRight size={20} strokeWidth={2.2} />
              </button>
              </div>

              <div className="mt-3 grid grid-cols-7">
              {weekdayLetters.map((weekday, index) => (
                <span
                  key={`${weekday}-${index}`}
                  className="flex h-7 items-center justify-center text-[10px] font-semibold uppercase text-[#7B8E8B]"
                >
                  {weekday}
                </span>
              ))}
              </div>

              <div className="grid grid-cols-7 gap-y-1">
              {visibleMonthDays.map((date) => {
                const isCurrentMonth = date.getMonth() === calendarMonth.getMonth();
                const isToday = sameDay(date, new Date());
                const noteCount = getNoteCountForDate(notes, date);
                const isDisabled = noteCount === 0;
                const isSelected = !isDisabled && sameDay(date, selectedDate);

                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      setSelectedDate(date);
                      setFilter('date');
                      setIsCalendarOpen(false);
                      if (!isCurrentMonth) {
                        setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));
                      }
                    }}
                    className={`relative mx-auto flex h-9 w-9 items-center justify-center rounded-[12px] text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95] ${
                      isSelected
                        ? 'bg-[#008C95] text-white'
                        : isDisabled
                          ? 'cursor-default text-[#B8C3C1]'
                          : isToday
                            ? 'border border-[#008C95] text-[#0E6F74] active:bg-[#EAF7F4]'
                            : isCurrentMonth
                              ? 'text-[#243238] active:bg-[#EAF7F4]'
                              : 'text-[#61777B] active:bg-[#F2F5F4]'
                    }`}
                    aria-label={
                      isDisabled
                        ? `${longDateFormatter.format(date)}, no saved notes`
                        : `${longDateFormatter.format(date)}, ${noteCount} ${
                            noteCount === 1 ? 'note' : 'notes'
                          }`
                    }
                  >
                    {date.getDate()}
                    {noteCount > 0 ? (
                      <span
                        className={`absolute bottom-1 h-1 w-1 rounded-full ${
                          isSelected ? 'bg-white' : 'bg-[#008C95]'
                        }`}
                        aria-hidden="true"
                      />
                    ) : null}
                  </button>
                );
              })}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="hide-scrollbar mt-6 min-h-0 flex-1 overflow-y-auto">
        {groupedNotes.length === 0 && !showDraft ? (
          <div className="flex flex-col items-center rounded-[22px] border border-[rgba(0,140,149,0.16)] bg-[#EAF4F1] px-6 py-7 text-center">
            <img
              src="/lingi-parrot.png"
              alt=""
              aria-hidden="true"
              className="h-[72px] w-[72px] object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.07)]"
            />
            <p className="mt-3 text-[15px] font-semibold leading-[21px] text-[#243238]">{emptyState.title}</p>
            <p className="mt-2 max-w-[300px] text-[13px] leading-[20px] text-[#61777B]">{emptyState.detail}</p>
            {query.trim() || !isPastDateFilter ? (
              <button
                type="button"
                onClick={() => {
                  if (query.trim()) {
                    setQuery('');
                    return;
                  }

                  onStartNote();
                }}
                className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#008C95] px-5 text-[13px] font-semibold leading-none text-white transition-colors active:bg-[#007B83] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95] focus-visible:ring-offset-2"
              >
                {query.trim() ? 'Clear search' : 'Start a note'}
                {!query.trim() ? <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" /> : null}
              </button>
            ) : null}
          </div>
        ) : (
          <div className="space-y-8">
            {showDraft ? (
              <section>
                <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#61777B]">Draft</h2>
                <article className="relative rounded-[12px] border border-dashed border-[rgba(0,140,149,0.42)] bg-transparent px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#61777B]">
                        Not saved yet
                      </p>
                      <p className="mt-3 line-clamp-4 whitespace-pre-wrap text-[14px] leading-[22px] text-[#243238]">
                        {draftText.trim()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsDraftMenuOpen((isOpen) => !isOpen)}
                      data-library-menu
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#61777B] active:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95]"
                      aria-label="More actions for draft"
                      aria-expanded={isDraftMenuOpen}
                    >
                      <MoreHorizontal size={19} strokeWidth={2} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={onContinueDraft}
                    className="mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#008C95] px-4 text-[13px] font-semibold leading-none text-white transition-colors active:bg-[#007B83] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95] focus-visible:ring-offset-2"
                  >
                    Keep editing
                    <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                  </button>

                  {isDraftMenuOpen ? (
                    <div
                      data-library-menu
                      className="absolute right-3 top-12 z-10 min-w-[148px] rounded-[14px] border border-[rgba(0,140,149,0.12)] bg-[#FEFEFE] p-1.5 shadow-[0_12px_28px_rgba(64,93,91,0.14)]"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onDiscardDraft();
                          setIsDraftMenuOpen(false);
                        }}
                        className="flex h-9 w-full items-center gap-2 rounded-[10px] px-3 text-left text-[13px] text-[#A64F3F] active:bg-[rgba(178,91,73,0.08)]"
                      >
                        <Trash2 size={15} strokeWidth={2} />
                        Discard draft
                      </button>
                    </div>
                  ) : null}
                </article>
              </section>
            ) : null}

            {groupedNotes.map((group) => (
              <section key={group.key}>
                <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#61777B]">
                  {getGroupTitle(group.date)}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {group.notes.map((note) => {
                    const isMenuOpen = openMenuId === note.id;

                    return (
                      <article
                        key={note.id}
                        className="relative h-[136px] min-w-0 rounded-[12px] border border-transparent bg-[linear-gradient(145deg,#ECF6F3_0%,#E1EFEB_100%)] px-4 py-4"
                      >
                        <div className="h-full min-w-0">
                          <p className="line-clamp-3 min-w-0 whitespace-pre-wrap pr-10 text-[14px] font-normal leading-[20px] text-black">
                            {note.text}
                          </p>

                          <button
                            type="button"
                            onClick={() => setOpenMenuId(isMenuOpen ? null : note.id)}
                            data-library-menu
                            className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full text-[#61777B] active:bg-[#EAF3F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008C95]"
                            aria-label={`More actions for note: ${note.text.slice(0, 40)}`}
                            aria-expanded={isMenuOpen}
                          >
                            <MoreHorizontal size={19} strokeWidth={2} />
                          </button>
                        </div>

                        {isMenuOpen ? (
                          <div
                            data-library-menu
                            className="absolute right-3 top-12 z-10 min-w-[128px] rounded-[14px] border border-[rgba(0,140,149,0.12)] bg-[#FEFEFE] p-1.5 shadow-[0_12px_28px_rgba(64,93,91,0.14)]"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                onEditNote(note);
                                setOpenMenuId(null);
                              }}
                              className="flex h-9 w-full items-center gap-2 rounded-[10px] px-3 text-left text-[13px] text-[#243238] active:bg-[#F2F5F4]"
                            >
                              <Pencil size={15} strokeWidth={2} />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onDeleteNote(note.id);
                                setOpenMenuId(null);
                              }}
                              className="flex h-9 w-full items-center gap-2 rounded-[10px] px-3 text-left text-[13px] text-[#A64F3F] active:bg-[rgba(178,91,73,0.08)]"
                            >
                              <Trash2 size={15} strokeWidth={2} />
                              Delete
                            </button>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
        <div className="h-[calc(114px_+_env(safe-area-inset-bottom))] shrink-0" aria-hidden="true" />
      </div>
    </section>
  );
}
