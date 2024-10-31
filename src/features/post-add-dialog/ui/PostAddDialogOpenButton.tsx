import { Button } from "@/shared/ui"
import { Plus } from "lucide-react"

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const PostAddDialogOpenButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <Plus className="w-4 h-4 mr-2" />
      게시물 추가
    </Button>
  )
}

export default PostAddDialogOpenButton
