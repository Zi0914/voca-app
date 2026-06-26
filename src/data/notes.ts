export type NoteType = 'word' | 'phrase' | 'sentence';

export type Note = {
  id: string;
  type: NoteType;
  english: string;
  chinese: string;
  highlight: string;
  explanation: string;
  addedAt: string;
};

export const noteMockData: Note[] = [
  {
    id: '1',
    type: 'sentence',
    english: "I'm still working on it.",
    chinese: '我还在处理 / 我还在做这个。',
    highlight: 'still working on = 还在处理某事',
    explanation: 'A gentle way to say you are still handling something.',
    addedAt: '2026-06-23T08:10:00.000Z',
  },
  {
    id: '2',
    type: 'phrase',
    english: 'take care of',
    chinese: '照顾；处理',
    highlight: 'I’ll take care of it. = 我来处理吧。',
    explanation: 'Used to say you will handle or look after something.',
    addedAt: '2026-06-23T08:12:00.000Z',
  },
  {
    id: '3',
    type: 'word',
    english: 'breeze',
    chinese: '微风',
    highlight: 'a gentle wind = 轻柔的风',
    explanation: 'A soft wind often used in calm, natural descriptions.',
    addedAt: '2026-06-23T08:15:00.000Z',
  },
  {
    id: '4',
    type: 'sentence',
    english: "I’ll send it before EOD.",
    chinese: '我会在今天下班前发给你。',
    highlight: 'EOD = end of day',
    explanation: 'A common business phrase to promise delivery before the workday ends.',
    addedAt: '2026-06-23T08:18:00.000Z',
  },
];
