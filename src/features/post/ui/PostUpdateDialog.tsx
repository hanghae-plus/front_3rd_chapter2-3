import { ChangeEvent, useEffect, useState } from "react"
import { Input, Textarea, Button } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { Post } from "../../../entities/post/model/types"
import { useDialog } from "../model/dialogStore"
import { usePostMutations, usePosts } from "../model/postStore"

export const PostUpdateDialog = () => {
  const { selectedPost } = usePosts()
  const [updatingPost, setUpdatingPost] = useState<Post | null>(selectedPost)

  const { showPostUpdateDialog, setShowPostUpdateDialog } = useDialog()

  const { updatePost } = usePostMutations()

  const handlePostUpdate = () => {
    if (!updatingPost) return
    updatePost.mutate(updatingPost)
    setShowPostUpdateDialog(false)
  }

  const handlePostTitleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    if (!updatingPost) return
    setUpdatingPost({ ...updatingPost, title: e.target.value })
  }

  const handlePostBodyUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!updatingPost) return
    setUpdatingPost({ ...updatingPost, body: e.target.value })
  }

  useEffect(() => {
    if (showPostUpdateDialog && selectedPost) {
      setUpdatingPost({ ...selectedPost })
    }
  }, [showPostUpdateDialog, selectedPost])

  return (
    <CustomDialog open={showPostUpdateDialog} onOpenChange={setShowPostUpdateDialog} title={"게시물 수정"}>
      <>
        <Input placeholder="제목" value={updatingPost?.title} onChange={handlePostTitleUpdate} />
        <Textarea rows={15} placeholder="내용" value={updatingPost?.body} onChange={handlePostBodyUpdate} />
        <Button onClick={handlePostUpdate}>게시물 업데이트</Button>
      </>
    </CustomDialog>
  )
}
