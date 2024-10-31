import { ChangeEvent, useEffect, useState } from "react"
import { Input, Textarea, Button } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { Post } from "../../../entities/post/model/types"
import { useDialog } from "../model/dialogStore"
import { usePostMutations } from "../model/postStore"

export const PostUpdateDialog: React.FC<{
  selectedPost: Post
}> = ({ selectedPost }) => {
  const [updatingPost, setUpdatingPost] = useState<Post>({ ...selectedPost })

  const { showPostUpdateDialog, setShowPostUpdateDialog } = useDialog()

  const { updatePost } = usePostMutations()

  const handlePostUpdate = () => {
    if (!updatingPost) return
    updatePost.mutate(updatingPost)
    setShowPostUpdateDialog(false)
  }

  useEffect(() => {
    if (showPostUpdateDialog) {
      setUpdatingPost({ ...selectedPost })
    }
  }, [showPostUpdateDialog, selectedPost])

  return (
    <CustomDialog open={showPostUpdateDialog} onOpenChange={setShowPostUpdateDialog} title={"게시물 수정"}>
      <>
        <Input
          placeholder="제목"
          value={updatingPost.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUpdatingPost((prevPost) => ({ ...prevPost, title: e.target.value }))
          }
        />
        <Textarea
          rows={15}
          placeholder="내용"
          value={updatingPost.body}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUpdatingPost((prevPost) => ({ ...prevPost, body: e.target.value }))
          }
        />
        <Button onClick={handlePostUpdate}>게시물 업데이트</Button>
      </>
    </CustomDialog>
  )
}
