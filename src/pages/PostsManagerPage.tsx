import { Card, CardContent, CardHeader } from "../shared/ui"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DialogProvider } from "../app/ui/DialogProvider"
import { PostTitle } from "../features/post/ui/PostTitle"
import { PostContent } from "../features/post/ui/PostContent"

const PostsManager = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <Card className="w-full max-w-6xl mx-auto">
          <CardHeader>
            <PostTitle />
          </CardHeader>
          <CardContent>
            <PostContent />
          </CardContent>
        </Card>
      </DialogProvider>
    </QueryClientProvider>
  )
}

export default PostsManager
