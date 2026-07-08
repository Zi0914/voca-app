import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-lingi-greeting',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-lingi-text',
});

export const metadata: Metadata = {
  title: 'Voca',
  description: 'A gentle mobile-first vocabulary capture PWA prototype.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
