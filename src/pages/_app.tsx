import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import theme from '../styles/theme';
import AppProvider from '../hooks';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  </ThemeProvider>
);

export default MyApp;
