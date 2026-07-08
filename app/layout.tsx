import type { Metadata } from 'next';
import { Caveat } from 'next/font/google';
import './globals.css';

const caveat = Caveat({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-lingi-hand',
});

export const metadata: Metadata = {
  title: 'Voca',
  description: 'A gentle mobile-first vocabulary capture PWA prototype.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={caveat.variable}>
      <body>{children}</body>
    </html>
  );
}
