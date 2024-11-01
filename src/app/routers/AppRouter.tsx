import { PropsWithChildren } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export function AppRouter({ children }: PropsWithChildren) {
  return <Router>{children}</Router>;
}
