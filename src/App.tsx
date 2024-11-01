import { BrowserRouter as Router } from "react-router-dom"
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PostContent } from "@/widgets/post"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostContent />
            <Footer />
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
