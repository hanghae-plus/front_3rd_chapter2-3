import { Button } from "@/shared/ui"
import { Plus } from "lucide-react"

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const CommentAddDialogOpenButton = ({ onClick }: Props) => {
  return (
    <Button size="sm" onClick={onClick}>
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
}

export default CommentAddDialogOpenButton
