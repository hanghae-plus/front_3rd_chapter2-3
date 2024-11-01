import { OverlayProvider } from "overlay-kit"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { QueryProvider } from "./app/providers/QueryProvider.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <OverlayProvider>
        <App />
      </OverlayProvider>
    </QueryProvider>
  </StrictMode>,
)
