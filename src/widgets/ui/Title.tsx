import { Plus } from "lucide-react"
import { Button } from "../../shared/ui"
import { usePostDialog } from "../../features/post/model/usePostDialog"

export function Title(): JSX.Element {
  const { setShowAddDialog } = usePostDialog()
  return (
    <div className="flex items-center justify-between">
      <span>게시물 관리자</span>
      <Button onClick={() => setShowAddDialog(true)}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>
    </div>
  )
}
