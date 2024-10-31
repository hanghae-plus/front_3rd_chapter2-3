import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { Edit2 } from "lucide-react"
import { useState } from "react"
import PostEditModal from "./PostEditModal.tsx"
import { Post } from "../../../entities/post/model/types.ts"

interface Props {
  post: Post
}

const PostEditButton = ({ post }: Props) => {
  const [showEditPostDialog, setShowEditPostDialog] = useState<boolean>(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          // setSelectedPost(post)
          setShowEditPostDialog(true)
        }}
      >
        <Edit2 className="w-4 h-4" />
      </Button>
      <PostEditModal
        post={post}
        showEditPostDialog={showEditPostDialog}
        setShowEditPostDialog={setShowEditPostDialog}
      />
    </>
  )
}

export default PostEditButton
