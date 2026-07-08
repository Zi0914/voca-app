import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-lingi-greeting',
});

export const metadata: Metadata = {
  title: 'Voca',
  description: 'A gentle mobile-first vocabulary capture PWA prototype.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fredoka.variable}>
      <body>{children}</body>
    </html>
  );
}
