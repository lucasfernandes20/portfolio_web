import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import { fonts } from './fonts';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/organisms/header';

export const metadata: Metadata = {
  title: 'Lucas portfolio',
  description: 'Lucas Fernandes web portfolio',
  keywords: [
    'Development',
    'Portfolio',
    'web portfolio',
    'web developer',
    'Developer',
    'Javascript',
    'Typescript',
    'Font-end',
    'Lucas Fernandes'
  ]
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={fonts.poppins.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
