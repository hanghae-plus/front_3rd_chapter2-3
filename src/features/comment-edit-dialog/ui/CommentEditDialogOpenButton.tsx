import { Button } from "@/shared/ui"
import { Edit2 } from "lucide-react"

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const CommentEditDialogOpenButton = ({ onClick }: Props) => {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}

export default CommentEditDialogOpenButton
