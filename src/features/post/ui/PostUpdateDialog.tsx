// 게시물 수정 대화상자

import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { Post } from "../../../entities/post/model/type"
import { DialogHeader, Input, Textarea, Button } from "../../../shared/ui"
import { usePost } from "../model/store"

export const PostUpdateDialog = () => {
  const { selectedPost, updatePost, setShowEditDialog, showEditDialog, setSelectedPost } = usePost()
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
          {selectedPost && <Button onClick={() => updatePost(selectedPost)}>게시물 업데이트</Button>}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostUpdateDialog
