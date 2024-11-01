import { Edit2 } from "lucide-react"
import { Button } from "@/shared/ui"

export const PostCommentEditButton = () => {
  const handleClickEdit = () => {}

  return (
    <Button variant="ghost" size="sm" onClick={handleClickEdit}>
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}
