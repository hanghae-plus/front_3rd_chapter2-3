import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/index.css'
import App from './app/App.tsx'
import QueryProvider from './app/provider/QueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryProvider>
       <App />
     </QueryProvider>
  </StrictMode>,
)
