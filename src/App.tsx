import { BrowserRouter as Router } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import Header from "./widgets/layout/ui/Header.tsx"
import Footer from "./widgets/layout/ui/Footer.tsx"
import RootContainer from "./widgets/layout/ui/RootContainer.tsx"
import Main from "./widgets/layout/ui/Main.tsx"

import PostsManager from "./pages/PostsManagerPage.tsx"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <RootContainer>
          <Header />
          <Main>
            <PostsManager />
          </Main>
          <Footer />
        </RootContainer>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
