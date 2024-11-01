import { Card } from "../shared/ui"
import PostAddDialog from "../features/post/ui/PostAddDialog.tsx"
import PostEditDialog from "../features/post/ui/PostEditDialog.tsx"
import PostDetailDialog from "../features/post/ui/PostDetailDialog.tsx"
import UserDetailDialog from "../features/user/ui/UserDetailDialog.tsx"
import CommentAddDialog from "../features/comment/ui/CommentAddDialog.tsx"
import CommentEditDialog from "../features/comment/ui/CommentEditDialog.tsx"
import PostManagement from "../features/post/ui/PostManagement.tsx"

const PostsManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostManagement />

      <PostAddDialog />
      <PostEditDialog />
      <PostDetailDialog />
      <CommentAddDialog />
      <CommentEditDialog />
      <UserDetailDialog />
    </Card>
  )
}

export default PostsManager
