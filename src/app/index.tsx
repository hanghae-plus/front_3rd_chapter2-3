import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { QueryProvider } from './provider';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <Router>
        <App />
      </Router>
    </QueryProvider>
  </React.StrictMode>,
)