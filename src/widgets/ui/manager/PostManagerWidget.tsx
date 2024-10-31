import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../../../shared/ui"
import { usePost } from "../../../features/model/post/usePost"
import { PostTable } from "../post/PostTable"
import { PostFilters } from "../post/PostFilters"
import { PostPagination } from "../post/PostPagination"
import { PostManagerDialogs } from "./PostManagerDialogs"

export const PostManagerWidget = () => {
  const { setShowAddDialog } = usePost()

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
          <PostFilters />
          <PostTable />
          <PostPagination />
        </div>
      </CardContent>
      <PostManagerDialogs />
    </Card>
  )
}
