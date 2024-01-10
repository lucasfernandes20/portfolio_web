// app/fonts.ts
import { Rubik, Poppins } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik'
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: '100'
});

export const fonts = {
  rubik,
  poppins
};
