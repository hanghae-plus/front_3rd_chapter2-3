import { BrowserRouter as Router } from "react-router-dom"
import Header from "./widgets/layout/ui/Header.tsx"
import Footer from "./widgets/layout/ui/Footer.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

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
          <ReactQueryDevtools />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
