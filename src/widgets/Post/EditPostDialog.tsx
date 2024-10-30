import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../shared/ui"
import { usePostDialog } from "../../features/post/model/usePostDialog"
import usePost from "../../features/post/model/usePost"

export const EditPostDialog: React.FC = () => {
  const { showEditDialog, setShowEditDialog } = usePostDialog()
  const { selectedPost, setSelectedPost } = usePost()

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

  const handleSelectedPostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectedPost({ ...selectedPost, [e.target.name]: e.target.value })
  }

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={selectedPost?.title || ""} onChange={handleSelectedPostChange} />
          <Textarea
            rows={15}
            name="body"
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={handleSelectedPostChange}
          />
          <Button onClick={() => updatePost()}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
