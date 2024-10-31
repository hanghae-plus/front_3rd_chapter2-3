import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AppRouter } from "@/app/router"
import "@/app/style/index.css"
import { QueryProvider } from "@/app/store"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  </StrictMode>,
)
