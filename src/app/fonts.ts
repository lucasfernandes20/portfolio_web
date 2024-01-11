// app/fonts.ts
import { Rubik, Poppins } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik'
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  style: ['normal', 'italic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const fonts = {
  rubik,
  poppins
};
