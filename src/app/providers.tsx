'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import React from 'react';
import { GlobalContextProvider } from './context/store';

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <GlobalContextProvider>
      <NextThemeProvider {...props}>
        <ChakraProvider>{children}</ChakraProvider>
      </NextThemeProvider>
    </GlobalContextProvider>
  );
}
