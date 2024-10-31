import { Button } from "@/shared/ui"
import { MessageSquare } from "lucide-react"

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const PostDetailDialogOpenButton = ({ onClick }: Props) => {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}

export default PostDetailDialogOpenButton
