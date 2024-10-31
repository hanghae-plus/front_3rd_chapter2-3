import { Button } from "@/shared/ui"
import { Edit2 } from "lucide-react"

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const PostEditDialogOpenButton = ({ onClick }: Props) => {
  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      <Edit2 className="w-4 h-4" />
    </Button>
  )
}

export default PostEditDialogOpenButton
