import { Plus } from "lucide-react"
import { Button } from "../../shared/ui/Button"
import { CardHeader, CardTitle } from "../../shared/ui/Card"
import { usePostDialog } from "../../features/post/model/usePostDialog"

const PostsManagerHeader = () => {
  const { setShowAddDialog } = usePostDialog()
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  )
}

export default PostsManagerHeader