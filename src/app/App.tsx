import { BrowserRouter as Router } from "react-router-dom"
import Header from "../widgets/ui/layouts/Header"
import PostsManagerPage from "../pages/PostsManagerPage"
import Footer from "../widgets/ui/layouts/Footer"

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
