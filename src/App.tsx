import { BrowserRouter as Router } from "react-router-dom"
import Header from "./widgets/layout/Header.tsx"
import Footer from "./widgets/layout/Footer.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import TanstackQueryProvider from "./app/tanstack-query/TanstackQueryProvider.tsx"

const App = () => {
  return (
    <Router>
      <TanstackQueryProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </TanstackQueryProvider>
    </Router>
  )
}

export default App
