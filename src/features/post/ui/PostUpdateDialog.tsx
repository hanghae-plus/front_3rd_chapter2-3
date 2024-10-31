import { ChangeEvent } from "react"
import { Input, Textarea, Button } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { useDialog } from "../model/dialogStore"
import { usePostMutations, usePosts } from "../model/postStore"

export const PostUpdateDialog = () => {
  const { selectedPost, setSelectedPost } = usePosts()

  const { showPostUpdateDialog, setShowPostUpdateDialog } = useDialog()

  const { updatePost } = usePostMutations()

  const handlePostUpdate = () => {
    if (!selectedPost) return
    updatePost.mutate(selectedPost)
    setShowPostUpdateDialog(false)
  }

  const handlePostTitleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    if (!selectedPost) return
    setSelectedPost({ ...selectedPost, title: e.target.value })
  }

  const handlePostBodyUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedPost) return
    setSelectedPost({ ...selectedPost, body: e.target.value })
  }

  return (
    <CustomDialog open={showPostUpdateDialog} onOpenChange={setShowPostUpdateDialog} title={"게시물 수정"}>
      <>
        <Input placeholder="제목" value={selectedPost?.title} onChange={handlePostTitleUpdate} />
        <Textarea rows={15} placeholder="내용" value={selectedPost?.body} onChange={handlePostBodyUpdate} />
        <Button onClick={handlePostUpdate}>게시물 업데이트</Button>
      </>
    </CustomDialog>
  )
}
