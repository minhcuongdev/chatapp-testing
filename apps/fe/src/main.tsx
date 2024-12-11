import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './configs/tanstack-query';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createTheme } from './theme';

const theme = createTheme({
  colorPreset: 'blue',
  contrast: 'normal',
  direction: 'ltr',
  paletteMode: 'light',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </QueryClientProvider>,
);
