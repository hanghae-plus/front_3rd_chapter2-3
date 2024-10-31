import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { Trash2 } from "lucide-react"
import { Post } from "../../../entities/post/model/types.ts"
import { useMutateDeletePost } from "../api/useMutateDeletePost.ts"

interface Props {
  post: Post
}

const PostDeleteButton = ({ post }: Props) => {
  const { mutate } = useMutateDeletePost()

  return (
    <Button variant="ghost" size="sm" onClick={() => mutate(post.id)}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

export default PostDeleteButton
