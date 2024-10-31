import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PostPage } from '@pages/post'

export const RouterProvider = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PostPage />} />
    </Routes>
  </Router>
)
