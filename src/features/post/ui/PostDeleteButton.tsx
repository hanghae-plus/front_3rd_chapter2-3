import { Trash2 } from "lucide-react"
import { Button } from "@/shared/ui"
import { useDeletePost } from "@/features/post"
import { Post } from "@/entities/post"

type PostDeleteButtonProps = {
  post: Post
}

export const PostDeleteButton = ({ post }: PostDeleteButtonProps) => {
  const { mutate } = useDeletePost(post.id)

  const handleClickDeletePost = () => {
    mutate()
  }
  
  return (
    <Button variant="ghost" size="sm" onClick={handleClickDeletePost}>
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
