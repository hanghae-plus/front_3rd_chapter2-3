import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import { QueryProvider } from "./app/providers/QueryProvider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryProvider>
        <App />
      </QueryProvider>
    </Router>
  </React.StrictMode>,
)
