import React from 'react';
import { createRoot } from 'react-dom/client';
import Bookshelf from './bookshelf';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Bookshelf />
    </ThemeProvider>
  </React.StrictMode>
);

