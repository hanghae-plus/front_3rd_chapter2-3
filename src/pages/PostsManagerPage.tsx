import { useEffect } from "react"
import { Plus } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/ui"
import { usePosts } from "../features/post/model/usePosts.ts"
import { usePostDialog } from "../features/post/model/usePostDialog.ts"
import PostTable from "../widgets/post/PostTable.tsx"
import { usePostParams } from "../features/post/model/usePostParams.ts"
import PostAddDialog from "../features/post/ui/PostAddDialog.tsx"
import PostEditDialog from "../features/post/ui/PostEditDialog.tsx"
import PostDetailDialog from "../features/post/ui/PostDetailDialog.tsx"
import UserDetailDialog from "../features/user/ui/UserDetailDialog.tsx"
import CommentAddDialog from "../features/comment/ui/CommentAddDialog.tsx"
import CommentEditDialog from "../features/comment/ui/CommentEditDialog.tsx"
import PostSearchFilter from "../features/post/ui/PostSearchFilter.tsx"
import PostPagination from "../features/post/ui/PostPagination.tsx"

const PostsManager = () => {
  const { getPosts, fetchPostsByTag, loading } = usePosts()
  const { setShowAddDialog } = usePostDialog()
  const { limit, skip, selectedTag, sortBy, sortOrder, updateURL } = usePostParams()

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag, limit, skip)
    } else {
      getPosts(limit, skip)
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostSearchFilter />
          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}
          <PostPagination />
        </div>
      </CardContent>

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
