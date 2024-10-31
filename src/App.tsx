import { BrowserRouter as Router } from 'react-router-dom'
import { Header, Footer } from '@widgets/common'
import PostPage from './pages/post/index.tsx'

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostPage />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
