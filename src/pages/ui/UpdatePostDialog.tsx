// 게시물 수정 대화상자

import { Button } from "../../shared/ui/Button"
import { Input } from "../../shared/ui/Input"
import { Textarea } from "../../shared/ui/Textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/Dialog"
import { usePost } from "../../features/post/model/usePost"
import { Post } from "../../entities/post/model/types"
import useMutationUpdatePost from "../../features/post/api/useMutationUpdatePost"

const UpdatePostDialog = () => {
  const { selectedPost, setSelectedPost, showEditDialog, setShowEditDialog } = usePost()
  const { mutate: mutateUpdatePost } = useMutationUpdatePost()

  // 게시물 업데이트
  const handleUpdatePost = () => {
    if (!selectedPost) return
    mutateUpdatePost(selectedPost)
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => setSelectedPost({ ...(selectedPost as Post), title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost({ ...(selectedPost as Post), body: e.target.value })}
          />
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdatePostDialog
