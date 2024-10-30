import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Router } from "@/app/router"
import "@/app/style/index.css"
import Layout from "@/app/layout/Layout"
import PostsManagerPage from "@/pages/PostsManagerPage"
import { QueryProvider } from "@/app/store"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Router>
        <Layout>
          <PostsManagerPage />
        </Layout>
      </Router>
    </QueryProvider>
  </StrictMode>,
)
