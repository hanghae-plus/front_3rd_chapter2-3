import { BrowserRouter as Router } from "react-router-dom";
import Header from "./widgets/layout/ui/header/Header.tsx";
import Footer from "./widgets/layout/ui/footer/Footer.tsx";
import PostsManagerPage from "./pages/PostsManagerPage.tsx";
import { OverlayProvider } from "overlay-kit";

const App = () => {
  return (
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
  );
};

export default App;
