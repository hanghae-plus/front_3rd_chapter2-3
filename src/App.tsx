import { BrowserRouter as Router } from "react-router-dom"
import Header from "./entities/ui/layout/Header.tsx"
import Footer from "./entities/ui/layout/Footer.tsx"
import { PostManagerPage } from "./pages/ui/manager/PostManagerPage.tsx"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostManagerPage />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
