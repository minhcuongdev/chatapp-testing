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

if (import.meta.env.MODE === 'e2e') {
  import('./__mocks__/browser')
    .then(async ({ worker }) => {
      await worker.start();
    })
    .then(() => {
      root.render(
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </QueryClientProvider>,
      );
    });
} else {
  root.render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>,
  );
}
