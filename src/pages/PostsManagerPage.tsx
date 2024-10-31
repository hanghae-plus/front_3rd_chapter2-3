import { Card } from "../shared/ui"
import PostsHeader from "../widgets/post/PostsHeader"
import PostsContent from "../widgets/post/PostsContent"
import PostAddDialog from "../widgets/post/PostAddDialog"
import PostUpdateDialog from "../widgets/post/PostUpdateDialog"
import CommentAddDialog from "../widgets/comments/CommentAddDialog"
import CommentUpdateDialog from "../widgets/comments/CommentUpdateDialog"
import PostDetailDialog from "../widgets/post/PostDetailDialog"
import UserModal from "../widgets/user/UserModal"
import { useLoading } from "../features/post/model/useLoading"

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
