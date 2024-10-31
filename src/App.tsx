import { AppRouter } from "@/app/routes";
import PostsManagerPage from "@/pages/post-manager/ui/PostsManagerPage";
import Footer from "@/widgets/layout/ui/Footer.tsx";
import Header from "@/widgets/layout/ui/Header.tsx";
import { AppProviders } from "./app/providers";

const App = () => {
  return (
    <AppProviders>
      <AppRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </AppRouter>
    </AppProviders>
  );
};

export default App;
