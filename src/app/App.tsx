import PostsManagerPage from '@/pages/PostsManagerPage.tsx';
import Footer from '@/widgets/ui/Footer.tsx';
import Header from '@/widgets/ui/Header.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routers';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </AppRouter>
    </QueryClientProvider>
  );
};

export default App;
