import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Header, Footer } from "./widgets/Layout/index.ts"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { PostsProvider } from "./PostsProvider.tsx"


const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsProvider>
            <PostsManagerPage />
          </PostsProvider>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
