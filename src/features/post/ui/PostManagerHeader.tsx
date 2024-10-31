import { Plus } from "lucide-react"

import Button from "../../../shared/ui/Button"
import Card from "../../../shared/ui/Card"

interface Props {
  openAddDialog: () => void
}

const PostManagerHeader = ({ openAddDialog }: Props) => {
  return (
    <Card.CardHeader>
      <Card.CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </Card.CardTitle>
    </Card.CardHeader>
  )
}

export default PostManagerHeader
