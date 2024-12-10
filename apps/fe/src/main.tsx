import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './configs/tanstack-query';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>

    <App />
  </QueryClientProvider>
);
