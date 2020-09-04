import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';

import theme from '../styles/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <ColorModeProvider>
      <Component {...pageProps} />
    </ColorModeProvider>
  </ThemeProvider>
);

export default MyApp;
