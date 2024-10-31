import { useAtom } from "jotai"
import { showAddDialogAtom } from "../../feature/post/model/postAtoms"
import { CardHeader, CardTitle } from "../../shared/ui/card/Card"
import { Button } from "../../shared/ui/button/Button"
import { Plus } from "lucide-react"

export const PostHeader = () => {
  const [, setShowAddDialog] = useAtom(showAddDialogAtom)

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
