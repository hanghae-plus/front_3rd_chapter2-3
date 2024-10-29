import { AppRouter } from "@/app/routes";
import PostsManagerPage from "@/pages/post-manager/ui/PostsManagerPage";
import Footer from "@/widgets/layout/ui/Footer.tsx";
import Header from "@/widgets/layout/ui/Header.tsx";
import { CommentProvider } from "./entities/comment/model/CommentContext";

const App = () => {
  return (
    <AppRouter>
      <CommentProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </CommentProvider>
    </AppRouter>
  );
};

export default App;
