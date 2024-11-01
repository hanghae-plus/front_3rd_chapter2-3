import { BrowserRouter as Router } from "react-router-dom"
import Header from "../widgets/layouts/ui/Header"
import Footer from "../widgets/layouts/ui/Footer"
import PostsPage from "../pages/PostsPage"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsPage />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
