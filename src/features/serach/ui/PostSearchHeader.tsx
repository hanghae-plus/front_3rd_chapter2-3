import { Plus } from "lucide-react"
import { usePostDialog } from "../../../entities/Post/model/usePostDialog"
import { Button, CardHeader, CardTitle } from "../../../shared/ui"

const PostSearchHeader: React.FC = () => {
  const { handleAddDialog } = usePostDialog()

  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={handleAddDialog}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  )
}

export default PostSearchHeader
