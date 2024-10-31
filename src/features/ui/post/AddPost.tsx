import { CardHeader, CardTitle } from "../../../shared/ui/card"
import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui/Button"
import { useAtom } from "jotai"
import { showAddDialogAtom } from "../../../app/atom"

const AddPost = () => {
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

export default AddPost
