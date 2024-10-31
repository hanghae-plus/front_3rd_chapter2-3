import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui"
import { PostDetailModal } from "../features/post-detail/ui/PostDetailModal"
import { UserModal } from "../features/user/ui/UserModal"
import { PostAddModal } from "../features/post-add/ui/PostAddModal"
import { PostTable } from "../widgets/post/ui/PostTable"
import { Pagination } from "../features/post-pagination/ui/Pagination"
import { PostEditModal } from "../features/post-edit/ui/PostEditModal"
import PostAddButton from "../features/post-add/ui/PostAddButton"
import { PostSearchBar } from "../widgets/post/ui/PostSearchBar"

const PostsManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <PostAddButton />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          <PostSearchBar />
          <PostTable />
          <Pagination />
        </div>
      </CardContent>

      <PostAddModal />
      <PostEditModal />
      <PostDetailModal />

      <UserModal />
    </Card>
  )
}

export default PostsManager
