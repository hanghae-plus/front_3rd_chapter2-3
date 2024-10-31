import React, { Dispatch, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog/ui"
import { Input } from "../../../shared/ui/input/ui/Input.tsx"
import { Textarea } from "../../../shared/ui/textarea/ui/Textarea.tsx"
import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { Post } from "../../../entities/post/model/types.ts"
import { useMutateEditPost } from "../api/useMutateEditPost.ts"

interface Props {
  post: Post
  showEditPostDialog: boolean
  setShowEditPostDialog: Dispatch<React.SetStateAction<boolean>>
}

const PostEditModal = ({ post, showEditPostDialog, setShowEditPostDialog }: Props) => {
  const [selectedPost, setSelectedPost] = useState<Post>(post)
  const { mutate } = useMutateEditPost({ setShowEditPostDialog })

  return (
    <Dialog open={showEditPostDialog} onOpenChange={setShowEditPostDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={() => mutate({ postId: selectedPost.id, post: selectedPost })}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostEditModal
