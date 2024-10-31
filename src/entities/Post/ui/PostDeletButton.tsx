import { Button } from "../../../shared/ui"
import { Trash2 } from "lucide-react"
import { usePostStore } from "../model/store"
import { PostType } from "../model/types"

interface PostDeleteButtonProps {
  post: PostType
}

export const PostDeleteButton = ({ post }: PostDeleteButtonProps) => {
  const { deletePost } = usePostStore()

  return (
    <Button variant="ghost" size="sm" onClick={() => deletePost(post)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
