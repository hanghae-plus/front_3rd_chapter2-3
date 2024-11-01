import { PostsTableContainer } from "@widgets/post/ui"
import { ModalProvider } from "@features/modal/ui/ModalProvider"
import { PostsHeader } from "@widgets/post/ui/PostsHeader"

const PostsManager = () => {
  return (
    <div className="w-full max-w-6xl mx-auto rounded-lg border bg-card text-card-foreground shadow-sm">
      <PostsHeader />
      <PostsTableContainer />
      <ModalProvider />
    </div>
  )
}

export default PostsManager
