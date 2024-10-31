import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query/queryClient.ts'
import { BrowserRouter as Router } from "react-router-dom"
import Header from "./widgets/ui/Header.tsx"
import Footer from "./widgets/ui/Footer.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import Main from "./widgets/ui/Main.tsx"

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Main>
            <PostsManagerPage />
          </Main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
