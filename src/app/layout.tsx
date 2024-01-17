import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { fonts } from './fonts';
import { Header } from './_components/organisms/header';

export const metadata: Metadata = {
  title: 'Lucas portfolio',
  description: 'Lucas Fernandes web portfolio',
  keywords: [
    'Development',
    'Developer',
    'Javascript',
    'Typescript',
    'Font-end',
    'Lucas Fernandes'
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={fonts.poppins.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
