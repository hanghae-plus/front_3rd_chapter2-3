import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { Layout } from "@/app/layout"
import PostsManagerPage from "@/pages/PostsManagerPage"

const POSTS_MANAGER_PAGE = "*"

const routes = [
  {
    path: POSTS_MANAGER_PAGE,
    component: PostsManagerPage,
  },
]

const routesContent = routes.map(({ path, component: Component }) => (
  <Route key={path} path={path} element={<Component />} />
))

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>{...routesContent}</Routes>
      </Layout>
    </Router>
  )
}

export { AppRouter }
