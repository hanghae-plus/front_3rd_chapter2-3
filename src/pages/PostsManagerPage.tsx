import { Card } from "../shared/ui"
import PostsHeader from "../features/post/ui/PostsHeader"
import PostsContent from "../widgets/post/PostsContent"
import CommentAddDialog from "../features/comment/ui/CommentAddDialog"
import CommentUpdateDialog from "../features/comment/ui/CommentUpdateDialog"
import UserModal from "../features/user/ui/UserModal"
import { useLoading } from "../shared/model/useLoading"
import PostAddDialog from "../features/post/ui/PostAddDialog"
import PostDetailDialog from "../features/post/ui/PostDetailDialog"
import PostUpdateDialog from "../features/post/ui/PostUpdateDialog"

const PostsManager = () => {
  const { loading } = useLoading()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostsHeader />
      <PostsContent loading={loading} />

      <PostAddDialog />
      <PostUpdateDialog />
      <CommentAddDialog />
      <CommentUpdateDialog />
      <PostDetailDialog />

      <UserModal />
    </Card>
  )
}

export default PostsManager
