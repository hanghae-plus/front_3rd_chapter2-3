import { MessageSquare } from "lucide-react"
import { Button } from "@/shared/ui"
import { Post } from "@/entities/post"
import { usePostStore } from "@/features/post"
import { useModalStore } from "@/features/modal"

type PostAddButtonProps = {
  post: Post
}

export const PostAddButton = ({ post }: PostAddButtonProps) => {
  const { updatePost } = usePostStore()
  const { openPostModal } = useModalStore()

  const handleClickPost = (post: Post) => {
    updatePost(post)
    openPostModal()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        handleClickPost(post)
      }}
    >
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}
