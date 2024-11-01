import { BrowserRouter as Router } from "react-router-dom"
import Header from "./shared/ui/Header.tsx"
import Footer from "./shared/ui/Footer.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import PostPage from "./pages/PostPage.tsx"

const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostPage />
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
