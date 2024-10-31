import { Plus } from "lucide-react"
import { Button, CardTitle } from "../../../shared/ui"
import { Dialog_e, useDialogStore } from "../../../shared/model/useDialogStore"

export const PostTitle = () => {
  const dialogStore = useDialogStore()

  const handleClickAddPost = () => {
    dialogStore.openDialog(Dialog_e.PostAdd)
  }

  return (
    <CardTitle className="flex items-center justify-between">
      <span>게시물 관리자</span>
      <Button onClick={handleClickAddPost}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>
    </CardTitle>
  )
}
