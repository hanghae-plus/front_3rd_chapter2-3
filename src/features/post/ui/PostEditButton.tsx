import { Edit2 } from "lucide-react"
import { Button } from "@/shared/ui"
import { Post } from "@/entities/post"
import { useModalStore } from "@/features/modal"
import { usePostStore } from "@/features/post"

type PostEditButtonProps = {
  post: Post
}

export const PostEditButton = ({ post }: PostEditButtonProps) => {
  const { openEditPostModal } = useModalStore()
  const { updatePost } = usePostStore()

  const handleClickEditPost = (post: Post) => {
    updatePost(post)
    openEditPostModal()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        handleClickEditPost(post)
      }}
    >
      <Edit2 className="w-4 h-4" />
    </Button>
  )
}
