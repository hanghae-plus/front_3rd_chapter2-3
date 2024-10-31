// 게시물 추가 대화상자

import { useState } from "react"
import { Button } from "../../shared/ui/Button"
import { Input } from "../../shared/ui/Input"
import { Textarea } from "../../shared/ui/Textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/Dialog"
import { usePost } from "../../features/post/model/usePost"
import { usePostDialog } from "../../features/post/model/usePostDialog"
import { postPostFetch } from "../../entities/post/api"

const AddPostDialog = () => {
  const { posts, setPosts } = usePost()
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const { showAddDialog, setShowAddDialog } = usePostDialog()

  // 게시물 추가
  const addPost = async () => {
    try {
      const data = await postPostFetch(newPost)
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddPostDialog
