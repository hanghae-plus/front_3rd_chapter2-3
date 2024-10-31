import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { updatePostApi } from "../../../entities/post/api"
import { usePostsStore } from "../../post/model/postStore"
import { usePostEditModalStore } from "../../post/model/postEditModalStore"

export const PostEditModal = () => {
  const { posts, setPosts, selectedPost, setSelectedPost } = usePostsStore()
  const { showPostEditModal, setShowPostEditModal } = usePostEditModalStore()

  const updatePost = async () => {
    if (!selectedPost) return

    const data = await updatePostApi(selectedPost)

    setPosts(posts.map((post) => (post.id === data.id ? data : post)))
    setShowPostEditModal(false)
  }

  return (
    <Dialog open={showPostEditModal} onOpenChange={setShowPostEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost!, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost!, body: e.target.value })}
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
