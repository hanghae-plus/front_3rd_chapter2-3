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

const PostsManager = () => {
  const { total, getPosts, fetchPostsByTag, loading } = usePosts()
  const { setShowAddDialog } = usePostDialog()
  const { limit, setLimit, skip, setSkip, selectedTag, sortBy, sortOrder, updateURL } = usePostParams()

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

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
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
