// 게시물 수정 대화상자

import React from "react"
import { Post } from "../model/Post"
import { Button } from "../../shared/ui/button/Button"
import { Input } from "../../shared/ui/input/Input"
import { Textarea } from "../../shared/ui/textarea/Textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/dialog/Dialog"
import { usePost } from "../../features/post/model/usePost"

interface Props {
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
  showEditDialog: boolean
}

const UpdatePostDialog = ({ setShowEditDialog, showEditDialog }: Props) => {
  const { posts, setPosts, selectedPost, setSelectedPost } = usePost()

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      const response = await fetch(`/api/posts/${selectedPost?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      const data = await response.json()
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
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
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdatePostDialog
