import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import { useDialog } from "../model/dialogStore"

export const PostTitle = () => {
  const { setShowPostAddDialog } = useDialog()

  // 게시물 추가 모달 열기
  const handlePostAddDialogOpen = () => {
    setShowPostAddDialog(true)
  }

  return (
    <>
      <span>게시물 관리자</span>
      <Button onClick={handlePostAddDialogOpen}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>
    </>
  )
}
