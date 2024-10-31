import { BrowserRouter as Router } from "react-router-dom"
import Header from "./widgets/ui/Header.tsx"
import Footer from "./widgets/ui/Footer.tsx"
import { Providers } from "./app/providers"
import { PostsManagerPage } from "./pages/posts-manager/ui/PostsManagerPage.tsx"

const App = () => {
  return (
    <Router>
      <Providers>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </Providers>
    </Router>
  )
}

export default App
