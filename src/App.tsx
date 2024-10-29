import { BrowserRouter as Router } from "react-router-dom"
import Header from "./widgets/layout/ui/Header.tsx"
import Footer from "./widgets/layout/ui/Footer.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { PostParamsContextProvider } from "./features/post/model/PostParamsContext.tsx"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow container mx-auto px-4 py-8">
          <PostParamsContextProvider>
            <PostsManagerPage />
          </PostParamsContextProvider>

          <Footer />
        </main>
      </div>
    </Router>
  )
}

export default App
