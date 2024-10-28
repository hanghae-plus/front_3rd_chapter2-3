// 게시물 수정 대화상자

import React from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../shared/ui"
import { Post } from "../model/Post"

interface Props {
  selectedPost: Post | null
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  posts: Post[]
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
  showEditDialog: boolean
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
}

const UpdatePostDialog = ({
  selectedPost,
  setPosts,
  posts,
  setShowEditDialog,
  showEditDialog,
  setSelectedPost,
}: Props) => {
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
