import { Button, CardContent, CardHeader, CardTitle } from "../../../shared/ui"
import { Plus } from "lucide-react"
import PostSearchFilter from "./PostSearchFilter.tsx"
import PostTable from "../../../widgets/post/PostTable.tsx"
import PostPagination from "./PostPagination.tsx"
import { usePostDialog } from "../model/usePostDialog.ts"
import { usePosts } from "../model/usePosts.ts"

export default function PostManagement() {
  const { loading } = usePosts()
  const { setShowAddDialog } = usePostDialog()

  return (
    <>
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
    </>
  )
}
