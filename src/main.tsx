import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./app/styles/index.css"
import App from "./App.tsx"
import Provider from "./app/provider/index.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
)
