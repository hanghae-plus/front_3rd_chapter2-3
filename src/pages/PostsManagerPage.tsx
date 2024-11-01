import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Post from "../widgets/ui"

const PostsManagerPage = () => {
  const queryClient = new QueryClient()
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Post />
      </QueryClientProvider>
    </div>
  )
}

export default PostsManagerPage
