import { BrowserRouter as Router  } from "react-router-dom"
import Header from "./widgets/layout/ui/Header.tsx"
import Footer from "./widgets/layout/ui/Footer.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider as JotaiProvider } from 'jotai';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <JotaiProvider>
              <QueryClientProvider client={queryClient}>
                <PostsManagerPage />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
          </JotaiProvider>
        </main>
        <Footer />
        </div>
      </Router>
  );
};

export default App;