// 게시물 수정 대화상자

import { Button } from "../../shared/ui/Button"
import { Input } from "../../shared/ui/Input"
import { Textarea } from "../../shared/ui/Textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/Dialog"
import { usePost } from "../../features/post/model/usePost"
import { usePostDialog } from "../../features/post/model/usePostDialog"
import { putPostFetch } from "../../entities/post/api"
import { Post } from "../../entities/post/model/types"

const UpdatePostDialog = () => {
  const { posts, setPosts, selectedPost, setSelectedPost } = usePost()
  const { showEditDialog, setShowEditDialog } = usePostDialog()

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      if (!selectedPost) throw new Error("do not selected Post")
      const data = await putPostFetch(selectedPost)
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
