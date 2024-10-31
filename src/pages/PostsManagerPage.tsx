import { Plus } from "lucide-react"
import { Suspense } from "react"
import { PostingTable, PostsFilterControls, PostsPagination } from "../features/posts"
import { openModals } from "../shared/lib/modal/openModals"
import { Button } from "../shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card"

const PostsManager = () => {
  const { post } = openModals

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => post.openAddDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostsFilterControls />
          <Suspense fallback={<div>로딩 중...</div>}>
            <PostingTable />
          </Suspense>
          <PostsPagination />
        </div>
      </CardContent>
    </Card>
  )
}

export default PostsManager
