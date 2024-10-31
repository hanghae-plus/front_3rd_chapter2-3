import { Trash2 } from "lucide-react"
import { Post } from "../../../entities/post/model/types"
import { Button } from "../../../shared/ui"
import { useDeletePostMutation } from "../api/useDeletePostMutation"

type Props = {
  postId: Post["id"]
}

export const PostDeleteButton = ({ postId }: Props) => {
  const { mutate: deletePostMutate } = useDeletePostMutation()

  return (
    <Button variant="ghost" size="sm" onClick={() => deletePostMutate(postId)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
