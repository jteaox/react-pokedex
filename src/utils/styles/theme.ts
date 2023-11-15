import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    low: Palette['primary'];
    medium: Palette['primary'];
    high: Palette['primary'];
    very_high: Palette['primary'];
  }

  interface PaletteOptions {
    low?: PaletteOptions['primary'];
    medium?: PaletteOptions['primary'];
    high?: PaletteOptions['primary'];
    very_high?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    low: true;
    medium: true;
    high: true;
    very_high: true;
  }
}

export const theme = createTheme({
  palette: {
    low: {
      main: '#f73823',
    },
    medium: {
      main: '#f78d23',
    },
    high: {
      main: '#7fb01e',
    },
    very_high: {
      main: '#2db002',
    },
  },
});
