import { AppRouter } from "@/app/routes";
import PostsManagerPage from "@/pages/PostsManagerPage.tsx";
import Footer from "@/widgets/layout/ui/Footer.tsx";
import Header from "@/widgets/layout/ui/Header.tsx";
import { PostProvider } from "./shared/model/PostContext";
import { CommentProvider } from "./shared/model/CommnentContext";

const App = () => {
  return (
    <AppRouter>
      <PostProvider>
        <CommentProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <PostsManagerPage />
            </main>
            <Footer />
          </div>
        </CommentProvider>
      </PostProvider>
    </AppRouter>
  );
};

export default App;
