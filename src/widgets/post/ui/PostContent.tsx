import { Card } from "@/shared/ui"
import { PostDetailModal, PostEditModal, PostTable } from "@/features/post"
import { UserModal } from "@/features/user"
import { CommentAddModal } from "@/features/comment"
import { Pagination } from "@/features/search"

export const PostContent = () => (
  <Card className="w-full max-w-6xl mx-auto">
    <PostTable />
    <Pagination />
    <UserModal />
    <PostDetailModal />
    <CommentAddModal />
    <PostEditModal />
  </Card>
)
