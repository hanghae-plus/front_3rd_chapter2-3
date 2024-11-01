import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OverlayProvider } from "overlay-kit";

import Header from "./widgets/layout/ui/header/Header.tsx";
import Footer from "./widgets/layout/ui/footer/Footer.tsx";
import PostsManagerPage from "./pages/PostsManagerPage.tsx";

const queryClinet = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClinet}>
      <Router>
        <OverlayProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <PostsManagerPage />
            </main>
            <Footer />
          </div>
        </OverlayProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
