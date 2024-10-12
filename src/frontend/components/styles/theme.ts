import { createTheme, ThemeOptions } from '@emotion/react';
import { Theme } from '@/frontend/types/theme';

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#6c757d',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: '#333',
      secondary: '#6c757d',
    },
  },
};

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#6c757d',
    },
    background: {
      default: '#333',
      paper: '#424242',
    },
    text: {
      primary: '#fff',
      secondary: '#6c757d',
    },
  },
};

const defaultTheme: ThemeOptions = lightTheme;

const theme: Theme = createTheme(defaultTheme);

export default theme;

export const getTheme = (): Theme => {
  const theme: Theme = createTheme(defaultTheme);
  return theme;
};