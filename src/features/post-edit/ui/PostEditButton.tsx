import { Edit2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { usePostEditModalStore } from "../../post/model/postEditModalStore"
import { usePostsStore } from "../../post/model/postStore"
import { Post } from "../../../entities/post/model/types"

interface Props {
  post: Post
}

export const PostEditButton = ({ post }: Props) => {
  const { setSelectedPost } = usePostsStore()
  const { setShowPostEditModal } = usePostEditModalStore()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        setSelectedPost(post)
        setShowPostEditModal(true)
      }}
    >
      <Edit2 className="w-4 h-4" />
    </Button>
  )
}
