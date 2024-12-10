import { QueryClient } from '@tanstack/react-query';

export const MINUTE = 1000 * 60;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      retryDelay: 3000,
      gcTime: 0,
    },
  },
});
