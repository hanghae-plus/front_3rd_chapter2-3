import './index.css';

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App.tsx';
import { DialogProvider } from './provider/DialogProvider.tsx';
import { queryClient } from './shared/api/queryClient.ts';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <App />
      </DialogProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
)
