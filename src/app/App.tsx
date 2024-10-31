import { BrowserRouter as Router } from "react-router-dom"
import Header from "../widgets/common/ui/Header"
import Footer from "../widgets/common/ui/Footer"
import PostsManagerPage from "../pages/PostsManagerPage.tsx"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsManagerPage />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
