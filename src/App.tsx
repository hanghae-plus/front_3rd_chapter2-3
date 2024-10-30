import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./widgets/layout/ui/Header.tsx"
import Footer from "./widgets/layout/ui/Footer.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import OriginC from "./pages/origin copy.tsx"
import Origin from "./pages/origin.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider as JotaiProvider } from 'jotai';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <JotaiProvider>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route path="/" element={<PostsManagerPage />} />
                <Route path="/origin" element={<Origin />} />
              </Routes>
            </QueryClientProvider>
          </JotaiProvider>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;