import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { queryClient } from "./shared/api/queryClient.ts"
import Footer from "./widgets/ui/Footer.tsx"
import Header from "./widgets/ui/Header.tsx"

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
